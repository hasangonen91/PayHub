import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from '../../../components/common/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AddCardFormProps {
  onSubmit: (cardData: {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted;
  };

  const handleSubmit = () => {
    onSubmit({
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardholderName,
      expiryMonth,
      expiryYear,
      cvv,
    });
  };

  const isFormValid = () => {
    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardholderName.length >= 3 &&
      expiryMonth.length === 2 &&
      expiryYear.length === 2 &&
      cvv.length === 3
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kart Numarası</Text>
            <View style={styles.cardNumberContainer}>
              <TextInput
                style={styles.cardNumberInput}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
              <Icon name="credit-card" size={24} color={colors.text.secondary} />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kart Sahibi</Text>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 2 }]}>
              <Text style={styles.label}>Son Kullanım Tarihi</Text>
              <View style={styles.expiryContainer}>
                <TextInput
                  style={styles.expiryInput}
                  placeholder="AA"
                  value={expiryMonth}
                  onChangeText={setExpiryMonth}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.expiryDivider}>/</Text>
                <TextInput
                  style={styles.expiryInput}
                  placeholder="YY"
                  value={expiryYear}
                  onChangeText={setExpiryYear}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="İptal"
              onPress={onCancel}
              variant="outline"
              style={styles.button}
            />
            <Button
              title="Kartı Ekle"
              onPress={handleSubmit}
              disabled={!isFormValid() || isLoading}
              loading={isLoading}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  formContainer: {
    padding: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  cardNumberInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.text.primary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  expiryInput: {
    width: 40,
    height: 48,
    fontSize: 16,
    textAlign: 'center',
    color: colors.text.primary,
  },
  expiryDivider: {
    fontSize: 20,
    color: colors.text.secondary,
    marginHorizontal: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});