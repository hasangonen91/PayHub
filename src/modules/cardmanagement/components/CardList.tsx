import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from '../../../types/Card';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';


interface CardListProps {
  cards: Card[];
  onCardPress: (card: Card) => void;
  onCardLongPress?: (card: Card) => void;
  onAddCardPress: () => void;
  onDeleteCard?: (cardId: string) => void;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  onCardPress,
  onCardLongPress,
  onAddCardPress,
}) => {
  const renderCardSchemeIcon = (scheme: Card['scheme']) => {
    const iconMap = {
      visa: require('../../../assets/card-icons/visa.png'),
      mastercard: require('../../../assets/card-icons/mastercard.png'),
      troy: require('../../../assets/card-icons/troy.png'),
      amex: require('../../../assets/card-icons/amex.png'),
    };

    return (
      <Image
        source={iconMap[scheme]}
        style={styles.schemeIcon}
        resizeMode="contain"
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              card.isDefault && styles.defaultCard,
              !card.isActive && styles.inactiveCard,
            ]}
            onPress={() => onCardPress(card)}
            onLongPress={() => onCardLongPress?.(card)}
          >
            <View style={styles.cardHeader}>
              {renderCardSchemeIcon(card.scheme)}
              {card.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Varsayılan</Text>
                </View>
              )}
            </View>

            <Text style={styles.cardNumber}>
              •••• •••• •••• {card.lastFourDigits}
            </Text>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.label}>Kart Sahibi</Text>
                <Text style={styles.value}>{card.cardholderName}</Text>
              </View>
              <View>
                <Text style={styles.label}>Son Kullanım</Text>
                <Text style={styles.value}>
                  {card.expiryMonth}/{card.expiryYear}
                </Text>
              </View>
            </View>

            {!card.isActive && (
              <View style={styles.inactiveOverlay}>
                <Text style={styles.inactiveText}>Deaktif</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addCardButton}
          onPress={onAddCardPress}
        >
          <Icon name="credit-card-plus" size={32} color={colors.primary.main} />
          <Text style={styles.addCardText}>Yeni Kart Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  card: {
    width: 300,
    height: 180,
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    padding: spacing.md,
    marginRight: spacing.md,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultCard: {
    backgroundColor: colors.primary.dark,
  },
  inactiveCard: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  schemeIcon: {
    width: 60,
    height: 40,
  },
  defaultBadge: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: '600',
  },
  cardNumber: {
    color: colors.background.primary,
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.background.primary,
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: colors.background.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  inactiveText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addCardButton: {
    width: 300,
    height: 180,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary.main,
  },
  addCardText: {
    color: colors.primary.main,
    marginTop: spacing.sm,
    fontSize: 16,
    fontWeight: '600',
  },
});