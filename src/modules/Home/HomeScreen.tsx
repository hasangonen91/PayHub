import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const HomeScreen: React.FC = () => {
  const balance = 12500.75;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
      </View>

      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
        <Text style={styles.balanceAmount}>
          {balance.toLocaleString('tr-TR', {
            style: 'currency',
            currency: 'TRY',
          })}
        </Text>
      </Card>

      <View style={styles.actionsContainer}>
        <Button
          title="QR ile Ödeme"
          onPress={() => {}}
          style={styles.actionButton}
        />
        <Button
          title="Kart İşlemleri"
          variant="secondary"
          onPress={() => {}}
          style={styles.actionButton}
        />
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
    padding: spacing.md,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  balanceCard: {
    marginHorizontal: spacing.md,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
  },
  actionsContainer: {
    padding: spacing.md,
  },
  actionButton: {
    marginVertical: spacing.sm,
  },
});