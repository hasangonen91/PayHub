import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Text,
  FlatList,
  Platform,
  Animated,
  LayoutAnimation,
  UIManager,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddCardForm } from './components/AddCardForm';
import { CustomHeader } from '../../components/common/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from '../../types/card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { RootStackParamList } from '../../types/RootStackParamList';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


// Android için layout animation desteği
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


export const CardManagementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      lastFourDigits: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      cardholderName: 'HASAN GÖNEN',
      type: 'credit',
      scheme: 'visa',
      isDefault: true,
      isActive: true,
      maskedNumber: '•••• •••• •••• 4242',
    },
    {
      id: '2',
      lastFourDigits: '8372',
      expiryMonth: '09',
      expiryYear: '24',
      cardholderName: 'HASAN GÖNEN',
      type: 'debit',
      scheme: 'mastercard',
      isDefault: false,
      isActive: true,
      maskedNumber: '•••• •••• •••• 8372',
    },
  ]);

  const cardStats = {
    total: cards.length,
    active: cards.filter(c => c.isActive).length,
    disabled: cards.filter(c => !c.isActive).length,
  };

  const handleAddCard = (cardData: any) => {
    const newCard: Card = {
      id: Date.now().toString(),
      lastFourDigits: cardData.cardNumber.slice(-4),
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
      cardholderName: cardData.cardholderName.toUpperCase(),
      type: 'credit',
      scheme: 'visa',
      isDefault: cards.length === 0,
      isActive: true,
      maskedNumber: `•••• •••• •••• ${cardData.cardNumber.slice(-4)}`,
    };

    setCards([...cards, newCard]);
    setShowAddForm(false);
  };

  const handleSetDefaultCard = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId,
    })));
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleCardExpansion = (cardId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  const renderCardDetails = (card: Card) => {
    if (expandedCardId !== card.id) return null;
  
    return (
      <Animated.View style={styles.cardDetails}>
        {/* Kart Görsel Kısmı */}
        <View style={[styles.cardPreview, card.scheme === 'visa' ? styles.visaCard : styles.mastercardCard]}>
          <View style={styles.cardPreviewHeader}>
            <Icon 
              name="contactless" 
              size={24} 
              color={colors.background.primary} 
            />
            <Image
              source={
                card.scheme === 'visa' 
                  ? require('../../assets/card-icons/visa.png')
                  : require('../../assets/card-icons/mastercard.png')
              }
              style={styles.cardSchemeIcon}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.cardNumber}>
            {card.maskedNumber}
          </Text>
          
          <View style={styles.cardPreviewFooter}>
            <View>
              <Text style={styles.cardPreviewLabel}>CARD HOLDER</Text>
              <Text style={styles.cardPreviewValue}>{card.cardholderName}</Text>
            </View>
            <View>
              <Text style={styles.cardPreviewLabel}>EXPIRES</Text>
              <Text style={styles.cardPreviewValue}>{card.expiryMonth}/{card.expiryYear}</Text>
            </View>
          </View>
        </View>
  
        {/* Kart İşlemleri */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleSetDefaultCard(card.id)}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary.main + '15' }]}>
              <Icon name="star" size={24} color={colors.primary.main} />
            </View>
            <Text style={styles.quickActionLabel}>
              {card.isDefault ? 'Varsayılan' : 'Varsayılan Yap'}
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => {}}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '15' }]}>
              <Icon name="lock" size={24} color={colors.success} />
            </View>
            <Text style={styles.quickActionLabel}>Güvenlik</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => {}}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.secondary.main + '15' }]}>
              <Icon name="cog" size={24} color={colors.secondary.main} />
            </View>
            <Text style={styles.quickActionLabel}>Ayarlar</Text>
          </TouchableOpacity>
        </View>
  
        {/* Kart Detayları */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Kart Bilgileri</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(card.id)}
            >
              <Icon name="delete-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Kart Tipi</Text>
              <Text style={styles.detailValue}>
                {card.type === 'credit' ? 'Kredi Kartı' : 'Banka Kartı'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Son Kullanım</Text>
              <Text style={styles.detailValue}>{card.expiryMonth}/{card.expiryYear}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Kart Durumu</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: card.isActive ? colors.success : colors.error }]} />
                <Text style={styles.detailValue}>{card.isActive ? 'Aktif' : 'Deaktif'}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Son İşlem</Text>
              <Text style={styles.detailValue}>8 Haz 2025</Text>
            </View>
          </View>
  
          {/* Harcama Özeti */}
          <View style={styles.spendingSummary}>
            <View style={styles.spendingHeader}>
              <Text style={styles.spendingTitle}>Bu Ay Harcama</Text>
              <Text style={styles.spendingAmount}>₺3.250,00</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.limitText}>Kart Limiti: ₺5.000,00</Text>
          </View>
        </View>
      </Animated.View>
    );
  };
  


  const renderQuickAction = ({ icon, title, onPress, color }: any) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderCard = ({ item: card }: { item: Card }) => (
    <TouchableOpacity
      style={[
        styles.cardItem,
        selectedCard?.id === card.id && styles.selectedCard,
        expandedCardId === card.id && styles.expandedCard,
      ]}
      onPress={() => toggleCardExpansion(card.id)}
      onLongPress={() => handleSetDefaultCard(card.id)}
      activeOpacity={0.8}
    >
      {expandedCardId !== card.id ? (
        // Kart kapalıyken gösterilecek kısım
        <>
          <View style={styles.cardItemLeft}>
            <Icon 
              name={card.scheme === 'visa' ? 'credit-card' : 'credit-card-outline'} 
              size={32} 
              color={colors.primary.main} 
            />
            <View style={styles.cardItemInfo}>
              <Text style={styles.cardItemTitle}>
                {card.type === 'credit' ? 'Kredi Kartı' : 'Banka Kartı'}
              </Text>
              <Text style={styles.cardItemNumber}>{card.maskedNumber}</Text>
            </View>
          </View>
          <View style={styles.cardItemRight}>
            {card.isDefault && (
              <View style={styles.defaultBadge}>
                <Icon name="star" size={16} color={colors.secondary.main} />
              </View>
            )}
            <Text style={styles.cardItemExpiry}>
              {card.expiryMonth}/{card.expiryYear}
            </Text>
          </View>
        </>
      ) : (
      renderCardDetails(card)
    )}
  </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Kartlarım"
        subtitle={`${cardStats.total} Kart${cardStats.total > 1 ? '' : ''}`}
        rightIcon="plus"
        onRightIconPress={() => setShowAddForm(true)}
      />

      {!showAddForm ? (
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Icon name="credit-card-check" size={24} color={colors.success} />
                  <Text style={styles.statNumber}>{cardStats.active}</Text>
                  <Text style={styles.statLabel}>Aktif Kart</Text>
                </View>
                <View style={styles.statCard}>
                  <Icon name="credit-card-off" size={24} color={colors.error} />
                  <Text style={styles.statNumber}>{cardStats.disabled}</Text>
                  <Text style={styles.statLabel}>Deaktif Kart</Text>
                </View>
              </View>

              <View style={styles.quickActions}>
                {renderQuickAction({
                  icon: 'credit-card-plus',
                  title: 'Kart Ekle',
                  onPress: () => setShowAddForm(true),
                  color: colors.primary.main,
                })}
                {renderQuickAction({
                  icon: 'credit-card-lock',
                  title: 'Güvenlik',
                  onPress: () => {},
                  color: colors.secondary.main,
                })}
                {renderQuickAction({
                  icon: 'credit-card-sync',
                  title: 'Limit',
                  onPress: () => {},
                  color: colors.success,
                })}
              </View>

              <Text style={styles.sectionTitle}>Tüm Kartlar</Text>
            </>
          )}
          data={cards}
          // renderItem={({ item: card }) => (
          //   <TouchableOpacity
          //     style={[
          //       styles.cardItem,
          //       selectedCard?.id === card.id && styles.selectedCard,
          //     ]}
          //     onPress={() => setSelectedCard(card)}
          //     onLongPress={() => handleSetDefaultCard(card.id)}
          //   >
          //     <View style={styles.cardItemLeft}>
          //       <Icon 
          //         name={card.scheme === 'visa' ? 'credit-card' : 'credit-card-outline'} 
          //         size={32} 
          //         color={colors.primary.main} 
          //       />
          //       <View style={styles.cardItemInfo}>
          //         <Text style={styles.cardItemTitle}>
          //           {card.type === 'credit' ? 'Kredi Kartı' : 'Banka Kartı'}
          //         </Text>
          //         <Text style={styles.cardItemNumber}>{card.maskedNumber}</Text>
          //       </View>
          //     </View>
          //     <View style={styles.cardItemRight}>
          //       {card.isDefault && (
          //         <View style={styles.defaultBadge}>
          //           <Icon name="star" size={16} color={colors.secondary.main} />
          //         </View>
          //       )}
          //       <Text style={styles.cardItemExpiry}>
          //         {card.expiryMonth}/{card.expiryYear}
          //       </Text>
          //     </View>
          //   </TouchableOpacity>
          // )}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <AddCardForm
          onSubmit={handleAddCard}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  quickActions: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    padding: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedCard: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },
  cardItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardItemInfo: {
    gap: spacing.xs,
  },
  cardItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardItemNumber: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardItemRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  defaultBadge: {
    backgroundColor: colors.secondary.main + '20',
    padding: spacing.xs,
    borderRadius: 12,
  },
  cardItemExpiry: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  expandedCard: {
    marginVertical: spacing.sm,
    borderColor: colors.primary.main,
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  cardAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  cardActionPrimary: {
    backgroundColor: colors.primary.main,
  },
  cardActionSecondary: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  cardActionDelete: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.error,
  },
  cardActionTextPrimary: {
    color: colors.background.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  cardActionTextSecondary: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: '600',
  },
  cardActionTextDelete: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '600',
  },
  cardUsageStats: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
  },
  usageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  usageBar: {
    height: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  usageBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.primary.main + '40',
    borderRadius: 12,
  },
  usageBarText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
  usageSubtext: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  cardDetails: {
    marginTop: spacing.md,
  },
  cardPreview: {
    height: 200,
    marginHorizontal: spacing.md,
    borderRadius: 16,
    padding: spacing.md,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  visaCard: {
    backgroundColor: '#1A1F71',
    backgroundGradient: ['#1A1F71', '#2557D6'],
  },
  mastercardCard: {
    backgroundColor: '#EB001B',
    backgroundGradient: ['#EB001B', '#F79E1B'],
  },
  cardPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSchemeIcon: {
    width: 60,
    height: 40,
  },
  cardNumber: {
    fontSize: 22,
    color: colors.background.primary,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardPreviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPreviewLabel: {
    fontSize: 10,
    color: colors.background.primary,
    opacity: 0.8,
    letterSpacing: 1,
  },
  cardPreviewValue: {
    fontSize: 14,
    color: colors.background.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    gap: spacing.md,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    fontSize: 12,
    color: colors.text.primary,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.md,
    borderRadius: 16,
    padding: spacing.md,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  detailItem: {
    width: '50%',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spendingSummary: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  spendingTitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  spendingAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.background.primary,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
  limitText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'right',
  },
});