// 1)fetch korbo
const loadData=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
        .then((res)=>res.json())
        .then((json)=>displayData(json.data))
}

const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>displayWord(data.data))
    
}

const displayWord=(word)=>{
    console.log(word);
    
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML=""
    word.forEach((w) => {
        console.log(w);
        
        const card=document.createElement("div")
            card.innerHTML=`
                <div class="card">
            <div class="max-w-sm mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between h-64">
            <!-- Content -->
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700">${w.word}</p>
                </div>
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700">Meaning/Pronunciation</p>
                </div>
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700 font-bangla">${w.meaning}/${w.pronunciation}</p>
                </div>

            <!-- Buttons -->
                <div class="flex justify-between gap-8 mt-4">
                    <button class="bg-[#1A91FF10] p-2 rounded-2xl hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-[#1A91FF10] p-2 rounded-2xl hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        </div>
            `
    wordContainer.appendChild(card)
        
    });
}
// 2)display function diye display korbo. Total 4 ti step e korbo
const displayData=(data)=>{
    // 1. Get the container and empty.
    const levelContainer=document.getElementById("level-container")
    levelContainer.innerHTML=""
    // 2.get into every data.
    for(let d of data){
    // 3.create Element
        const newDiv=document.createElement("div")
            newDiv.innerHTML=`
                <button onclick="loadWord(${d.level_no})" class="text-[#422AD5] font-semibold text-[14px] bg-none border-2 border-[#422AD5] rounded px-4 py-2 cursor-pointer hover:bg-[#422AD5] hover:text-white">Lesson- ${d.level_no}</button>

            `
    // 4.append to the container
    levelContainer.appendChild(newDiv)        
    }
}
loadData()