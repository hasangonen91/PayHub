import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/common/Card';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Card>
      <Text style={styles.label}>Toplam Bakiye</Text>
      <Text style={styles.balance}>
        {balance.toLocaleString('tr-TR', { 
          style: 'currency', 
          currency: 'TRY' 
        })}
      </Text>
      <View style={styles.row}>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>Son Güncelleme</Text>
          <Text style={styles.indicatorValue}>
            {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    alignItems: 'flex-start',
  },
  indicatorText: {
    fontSize: 12,
    color: colors.text.light,
  },
  indicatorValue: {
    fontSize: 14,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
});