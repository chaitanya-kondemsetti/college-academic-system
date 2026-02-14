const aat_1 = document.getElementById("aat1");
const aat_2 = document.getElementById("aat2");
const mid_1 = document.getElementById("mid1");
const mid_2 = document.getElementById("mid2");

let aat1 = 0, aat2 = 0, mid1 = 0, mid2 = 0;

aat_1.addEventListener("input", () => {
    aat1 = Number(aat_1.value);
});
aat_2.addEventListener("input", () => {
    aat2 = Number(aat_2.value);
});
mid_1.addEventListener("input", () => {
    mid1 = Number(mid_1.value);
});
mid_2.addEventListener("input", () => {
    mid2 = Number(mid_2.value);
});

function InternalMarksCalculator(aat1,aat2,mid1,mid2)
{
    if ((aat1>=0 && aat1<=10) && (aat2>=0 && aat2<=10) && (mid1>=0 && mid1<=35) && (mid2>=0 && mid2<=35))
    {
        let final_aat_marks=(aat1+aat2)/2;

        if(mid1>mid2)                                 
        {
            var final_mid_marks=(mid1*0.75)+(mid2*0.25);
            final_mid_marks=((final_mid_marks)/35)*20;
        }

        if(mid1<=mid2)
        {
            var final_mid_marks=(mid2*0.75)+(mid1*0.25);
            final_mid_marks=((final_mid_marks)/35)*20;
        }

        var InternalMarks=Math.floor(final_aat_marks+final_mid_marks);
        console.log(InternalMarks);
        return InternalMarks;
    }

    else
    {
        console.log("You Entered An Incorrect Value");
    }
}
document.getElementById("button").onclick = function () {
    if (aat_1.value === "" && mid_1.value === "" && aat_2.value === "" && mid_2.value === "") 
    {
        return;
    }

    const result = InternalMarksCalculator(aat1, aat2, mid1, mid2);

    const box = document.getElementById("resultBox");
    const totalText = document.querySelector(".output");

    
    totalText.style.display = "block";
    
    box.style.display = "flex";

    if (result !== undefined) {
        box.innerText = result;
    } else {
        box.innerText = "Invalid input";
    }
};



