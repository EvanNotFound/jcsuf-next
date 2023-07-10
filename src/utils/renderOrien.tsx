export default function renderOrien(orienId: number) {
    const orienMapping = [
        {id: -1, name: "Unknown"},
        {id: 0, name: "Male"},
        {id: 1, name: "Female"},
        {id: 2, name: "Bisexual"},
        {id: 3, name: "Aromantic"},
        {id: 4, name: "Unclear"},
        {id: 5, name: "Other"},
        {id: 6, name: "Rather Not Say"},
    ]

    const currentOrien = orienMapping.find((orien) => orienId === orien.id)?.name || "Unknown"

  return currentOrien
}
