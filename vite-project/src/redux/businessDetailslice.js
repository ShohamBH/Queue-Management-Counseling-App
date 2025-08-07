import { createSlice } from "@reduxjs/toolkit";

const initialBusinessDetails = sessionStorage.getItem("businessDetails")
    ? JSON.parse(sessionStorage.getItem("businessDetails"))
    : {
        id: "613",
        name: "משיבת נפש – ייעוץ תורני",
        address: "עזרא 40 בני ברק",
        phone: "0548502050",
        owner: "חנה מזל & שלמה מיכאל",
        logo: "https://coding-academy.org/images/ca_logo.png",
        description: "אתר ייעוץ לבית היהודי-האתר הטוב ביותר בכל הנושאים בבית יהודי",
    };

const businessDetailslice = createSlice({
    name: "businessDetails",
    initialState: { businessDetailsData: initialBusinessDetails },
    reducers: {
        editBusinessDetailsData(state, action) {
            state.businessDetailsData = action.payload;
            sessionStorage.setItem("businessDetails", JSON.stringify(action.payload));
        },
    },
});

export const { editBusinessDetailsData } = businessDetailslice.actions;
export default businessDetailslice.reducer;
