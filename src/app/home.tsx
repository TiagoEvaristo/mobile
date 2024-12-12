import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/Places";

type MarketProps = PlaceProps


export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [markets, setMarkets] = useState<MarketProps[]>([]);

    async function fetchCategories(){
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao buscar categorias");
        }
    }

    async function fetchMarkets(){
        try {
            if (!category) return;
            const { data } = await api.get(`/markets/category/${category}`);
            setMarkets(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao buscar mercados");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []); 

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    return (
        <View style={{flex:1}}>
            <Categories data={categories} onSelect={setCategory} seleted={category} />
            <Places data={markets} />
        </View>
    );
}