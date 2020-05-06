import * as Location from "expo-location";

export async function findCurrentLocation(): Promise<Location.LocationData> {
  const permission: Location.PermissionResponse = await Location.requestPermissionsAsync();
  if (permission.status !== "granted") {
    throw new Error(`Location access was denied status=${permission.status}`);
  }

  return await Location.getCurrentPositionAsync();
}
