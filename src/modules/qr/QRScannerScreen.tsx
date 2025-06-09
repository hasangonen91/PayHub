import React, { useCallback, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Button } from '../../components/common/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCANNER_AREA_SIZE = SCREEN_WIDTH * 0.7;

export const QRScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');
  const insets = useSafeAreaInsets();

  const requestPermission = useCallback(async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setHasPermission(cameraPermission === 'granted');
  }, []);

  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="camera-off" size={64} color={colors.text.secondary} />
        <Text style={styles.permissionTitle}>Kamera İzni Gerekli</Text>
        <Text style={styles.permissionText}>
          QR kod taraması yapabilmek için kamera izni vermeniz gerekmektedir.
        </Text>
        <Button 
          title="İzin Ver" 
          onPress={requestPermission}
          style={styles.button}
          // Removed the unsupported 'icon' prop
        />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="camera-off" size={64} color={colors.error} />
        <Text style={styles.permissionTitle}>Kamera Bulunamadı</Text>
        <Text style={styles.permissionText}>
          Cihazınızda kullanılabilir bir kamera bulunamadı.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={false}
        torch={isFlashOn ? 'on' : 'off'}
      />

      {/* Header */}
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="close" size={24} color={colors.background.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setIsFlashOn(!isFlashOn)}
        >
          <Icon 
            name={isFlashOn ? "flash" : "flash-off"} 
            size={24} 
            color={colors.background.primary} 
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.overlaySection, styles.bottomOverlay]}>
          <View style={styles.infoContainer}>
            <Icon name="qrcode-scan" size={24} color={colors.background.primary} />
            <Text style={styles.overlayTitle}>QR Kod Tarayın</Text>
            <Text style={styles.overlayText}>
              Ödeme yapmak istediğiniz QR kodu kare içerisine hizalayın
            </Text>
          </View>
        </View>
      <View style={styles.overlay}>
        {/* Üst karartma */}
        <View style={styles.overlaySection} />
        
        <View style={styles.middleSection}>
          {/* Sol karartma */}
          <View style={styles.overlaySide} />
          
          {/* Tarama alanı */}
          <View style={styles.scannerArea}>
            <View style={styles.scannerBorder}>
              <View style={[styles.scannerCorner, styles.topLeft]} />
              <View style={[styles.scannerCorner, styles.topRight]} />
              <View style={[styles.scannerCorner, styles.bottomLeft]} />
              <View style={[styles.scannerCorner, styles.bottomRight]} />
              
              {/* Animasyonlu tarama çizgisi */}
              <View style={styles.scanLine} />
            </View>
          </View>
          
          {/* Sağ karartma */}
          <View style={styles.overlaySide} />
        </View>
        
        {/* Alt bilgi alanı */}
        <View style={[styles.overlaySection, styles.bottomOverlay]}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Ödenecek Tutar</Text>
            <Text style={styles.amountValue}>₺150,00</Text>
          </View>

          <View style={styles.recentScans}>
            <TouchableOpacity style={styles.recentScan}>
              <Icon name="history" size={20} color={colors.background.primary} />
              <Text style={styles.recentScanText}>Son İşlemler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentScan}>
              <Icon name="image" size={20} color={colors.background.primary} />
              <Text style={styles.recentScanText}>Galeriden Seç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  permissionText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    zIndex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySection: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleSection: {
    flexDirection: 'row',
    height: SCANNER_AREA_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scannerArea: {
    width: SCANNER_AREA_SIZE,
    height: SCANNER_AREA_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBorder: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  scannerCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.primary.main,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: colors.primary.main,
    position: 'absolute',
    top: '50%',
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomOverlay: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom:  0,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  overlayTitle: {
    color: colors.background.primary,
    fontSize: 20,
    fontWeight: '600',
    marginVertical: spacing.sm,
  },
  overlayText: {
    color: colors.background.primary,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  amountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  amountLabel: {
    color: colors.background.primary,
    fontSize: 14,
    opacity: 0.8,
    marginBottom: spacing.xs,
  },
  amountValue: {
    color: colors.background.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  recentScans: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  recentScan: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    gap: spacing.xs,
  },
  recentScanText: {
    color: colors.background.primary,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});