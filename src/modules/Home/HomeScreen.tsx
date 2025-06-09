import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { RootStackParamList } from '../../types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const QUICK_ACTION_SIZE = (SCREEN_WIDTH - spacing.md * 4) / 3;

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const balance = 12500.75;
  const userName = "Hasan"; // Bu değer kullanıcı bilgilerinden gelmeli

  const quickActions: QuickAction[] = [
    {
      id: 'qr-payment',
      icon: 'qrcode-scan',
      title: 'QR ile Öde',
      onPress: () => navigation.navigate('QRScanner'),
      color: colors.primary.main,
    },
    {
      id: 'cards',
      icon: 'credit-card-multiple',
      title: 'Kartlarım',
      onPress: () => navigation.navigate('CardManagement'),
      color: colors.secondary.main,
    },
    {
      id: 'transfer',
      icon: 'bank-transfer',
      title: 'Transfer',
      onPress: () => {},
      color: colors.success,
    },
    {
      id: 'bills',
      icon: 'file-document-outline',
      title: 'Faturalar',
      onPress: () => {},
      color: '#E64980',
    },
    {
      id: 'investments',
      icon: 'chart-line',
      title: 'Yatırım',
      onPress: () => {},
      color: '#9775FA',
    },
    {
      id: 'more',
      icon: 'dots-horizontal',
      title: 'Diğer',
      onPress: () => {},
      color: colors.text.secondary,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Merhaba,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="bell-outline" size={24} color={colors.text.primary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <Card style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
            <Text style={styles.balanceAmount}>
              {balance.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.showHideButton}>
            <Icon name="eye-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Icon name="arrow-down" size={20} color={colors.success} />
            <Text style={styles.statLabel}>Gelir</Text>
            <Text style={styles.statAmount}>₺3.450</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="arrow-up" size={20} color={colors.error} />
            <Text style={styles.statLabel}>Gider</Text>
            <Text style={styles.statAmount}>₺1.280</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions Grid */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={action.onPress}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
                <Icon name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.recentTransactions}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son İşlemler</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        
        {/* Sample Transaction Items */}
        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Icon name="shopping-outline" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Market Alışverişi</Text>
              <Text style={styles.transactionDate}>8 Haziran, 23:45</Text>
            </View>
            <Text style={styles.transactionAmount}>-₺156,50</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  profileButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  balanceCard: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  showHideButton: {
    padding: spacing.xs,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginVertical: spacing.xs,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  quickActionsContainer: {
    padding: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  quickActionButton: {
    width: QUICK_ACTION_SIZE,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.text.primary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  recentTransactions: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  seeAllButton: {
    color: colors.primary.main,
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.main + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});