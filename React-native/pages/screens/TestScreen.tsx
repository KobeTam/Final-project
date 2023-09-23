import { View, Box, FlatList } from "native-base";
import { useState } from "react";

const data = [
    { title: "sdfdsfsdf", cat: "sport" },
    { title: "sdfdsfsdf", cat: "sport" },
    { title: "sdfdsfsdf", cat: "pet" },
    { title: "sdfdsfsdf", cat: "sport" },
    { title: "sdfdsfsdf", cat: "cars" },
    { title: "sdfdsfsdf", cat: "cars" },
    { title: "sdfdsfsdf", cat: "toys" },
    { title: "sdfdsfsdf", cat: "ggg" },
]

const catList = Array.from(new Set(data.map((v) => v.cat)));

function FilterPage() {
    const [filterString, setFilterString] = useState<string>("all");

    return (
        <>
            <FlatList
                data={["all", ...catList]}
                renderItem={({ item }) => (
                    <View>
                        {item}
                    </View>
                )}
                keyExtractor={(item) => item}
            />

            {data
                .filter((v) => {
                    if (filterString === "all") {
                        return true;
                    }
                    return v.cat === filterString;
                })
                .map((v) => (
                    <View key={v.title}>
                        {v.title}
                        {v.cat}
                    </View>
                ))}
        </>
    );
}

export default FilterPage

