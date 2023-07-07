export default function calculateLevel(exp: number) {
	const levelMapping = [
		{ expLimit: 0, levelText: "0" },
		{ expLimit: 30, levelText: "1" },
		{ expLimit: 60, levelText: "2" },
		{ expLimit: 100, levelText: "3" },
		{ expLimit: 200, levelText: "4" },
		{ expLimit: 500, levelText: "5" },
		{ expLimit: 800, levelText: "6" },
		{ expLimit: 1500, levelText: "7" },
		{ expLimit: 2500, levelText: "8" },
		{ expLimit: 4000, levelText: "9" },
		{ expLimit: 6000, levelText: "10" },
		{ expLimit: 10000, levelText: "11" },
		{ expLimit: Infinity, levelText: "12" },
	];

	const currentLevel =
		levelMapping.find((level) => exp < level.expLimit)?.levelText || "";

	return currentLevel;
}
