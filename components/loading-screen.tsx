import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function LoadingScreen() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
			<Text style={styles.text}>Kargatzen...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginTop: 16,
		fontSize: 16,
	},
});
