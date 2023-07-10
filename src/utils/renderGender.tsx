export default function renderGender(genderId: number) {
    const genderMapping = [
        {id: -1, name: "Unknown"},
        {id: 0, name: "Male"},
        {id: 1, name: "Female"},
        {id: 2, name: "Non-binary"},
        {id: 3, name: "Unclear"},
        {id: 4, name: "Other"},
        {id: 5, name: "Rather Not Say"},
    ]

    const currentGender = genderMapping.find((gender) => genderId === gender.id)?.name || "Unknown"

  return currentGender
}
