// 1)fetch korbo
const loadData=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
        .then((res)=>res.json())
        .then((json)=>displayData(json.data))
}

const removeActive=()=>{
    const lessonButton=document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton);
    lessonButton.forEach(btn=> btn.classList.remove("active"))
}

const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            removeActive()//prothome sob button theke active class remove korbe.
            const clickButton=document.getElementById(`click-btn-${id}`)
            clickButton.classList.add("active")//only jekhane click hoyeche sekhane active class add korbe.
            
            displayWord(data.data)
        })
    
}

const loadWordDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    console.log(url);
    const res=await fetch(url)
    const details=await res.json()
    displayWordDetails(details.data);
    
}

const displayWordDetails=(word)=>{
    console.log(word)
    const detailBox=document.getElementById("details-box")
    detailBox.innerHTML=`
<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-gray-200 rounded-2xl p-6 shadow-md border border-gray-300">
    
    <!-- Title -->
    <h1 class="text-2xl font-bold mb-4 flex">${word.word}<p>(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</p></h1>

    <!-- Meaning -->
    <h2 class="text-lg font-semibold mb-1">Meaning</h2>
    <p class="mb-4 text-gray-700">${word.meaning ? word.meaning :"অর্থ পাওয়া যায়নি"}</p>

    <!-- Example -->
    <h2 class="text-lg font-semibold mb-1">Example</h2>
    <p class="mb-4 text-gray-700">
    ${word.sentence}
    </p>

    <!-- Synonyms -->
    <h2 class="text-md font-semibold mb-2 font-bangla">সমার্থক শব্দ গুলো</h2>
    <div class="flex gap-2 flex-wrap mb-6">
    <span class="px-4 py-2 bg-gray-300 rounded-lg text-sm">${word.synonyms[0]? word.synonyms[0] : "Synonym পাওয়া যায়নি"}</span>
    <span class="px-4 py-2 bg-gray-300 rounded-lg text-sm">${word.synonyms[1]? word.synonyms[1] : "Synonym পাওয়া যায়নি"}</span>
    <span class="px-4 py-2 bg-gray-300 rounded-lg text-sm">${word.synonyms[2]? word.synonyms[2] : "Synonym পাওয়া যায়নি"}</span>
    </div>

    <!-- Button -->
    <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition">
    Complete Learning
    </button>

</div>
</div>
    `
    document.getElementById("word_modal").showModal();
}

const displayWord=(word)=>{
    // console.log(word);
    
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML=""

    if(word.length==0){
            wordContainer.innerHTML=`
            <div class="text-center col-span-3 space-y-6 py-10">
                <img src="./english-janala-resources/assets/alert-error.png" alt="error logo" class="mx-auto">
                <p class="text-xl text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                <p class="text-4xl font-semibold">নেক্সট Lesson এ যান</p>
            </div>

            `
        }
    word.forEach((w) => {
        // console.log(w);

        const card=document.createElement("div")
            card.innerHTML=`
                <div class="card">
            <div class="max-w-sm mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between h-64">
            <!-- Content -->
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700">${w.word ? w.word : "শব্দ  পাওয়া  যায়নি" }</p>
                </div>
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700">Meaning/Pronunciation</p>
                </div>
                <div class="flex-1 flex items-center justify-center text-center">
                    <p class="text-lg font-semibold text-gray-700 font-bangla">${w.meaning ? w.meaning : "অর্থ  পাওয়া  যায়নি"} / ${w.pronunciation ? w.pronunciation : "Pronunciation  পাওয়া  যায়নি"}</p>
                </div>

            <!-- Buttons -->
                <div class="flex justify-between gap-8 mt-4">
                    <button onclick="loadWordDetail(${w.id})" class="bg-[#1A91FF10] p-2 rounded-2xl hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
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
                <button id="click-btn-${d.level_no}" onclick="loadWord(${d.level_no})" 
                class="text-[#422AD5] font-semibold text-[14px] bg-none border-2 border-[#422AD5] rounded px-4 py-2 cursor-pointer hover:bg-[#422AD5] hover:text-white lesson-btn">Lesson- ${d.level_no}</button>

            `
    // 4.append to the container
    levelContainer.appendChild(newDiv)        
    }
}
loadData()