import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, CameraDevice, CameraPermissionStatus } from 'react-native-vision-camera';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Button } from '../../components/common/Button';

export const QRScannerScreen: React.FC = () => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  const requestPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    setCameraPermission(permission);
  }, []);

  if (cameraPermission === 'denied' || cameraPermission === 'restricted') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni gerekli</Text>
        <Button 
          title="İzin Ver" 
          onPress={requestPermission}
          style={styles.button} 
        />
      </View>
    );
  }

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni bekleniyor...</Text>
        <Button 
          title="İzin Ver" 
          onPress={requestPermission}
          style={styles.button} 
        />
      </View>
    );
  }

  const [cameraDevice, setCameraDevice] = useState<CameraDevice | null>(null);

  useEffect(() => {
    const fetchCameraDevices = async () => {
      const devices = await Camera.getAvailableCameraDevices();
      const backCamera = devices.find(device => device.position === 'back');
      setCameraDevice(backCamera || null);
    };

    fetchCameraDevices();
  }, []);

  return (
    <View style={styles.container}>
      {cameraDevice ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={cameraDevice}
          isActive={true}
        />
      ) : (
        <Text style={styles.text}>Kamera cihazı bulunamadı</Text>
      )}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>QR Kodu Tarayın</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
  overlay: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});