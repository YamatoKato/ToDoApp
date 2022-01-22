//コメント
//consoke.log() 動作確認

const form = document.getElementById("form"); 
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));


if(todos){    //todosに値があれば、add()に１個ずつ値を渡す。
    todos.forEach(todo=>{
        add(todo);
    })
}


//formでEnter(submit)された時inputの値をとる。
form.addEventListener("submit",function(event){
    event.preventDefault(); //formをsubmitした時のブラウザのリロードを中断できる。
    console.log(input.value);
    add();

});

function add(todo){
    let todoText = input.value;

    if(todo){  //todoがあったときは,todoTextに入れる
        todoText = todo.text;
    }

    if(todoText){ //todoText.length > 0と同じ
        const li = document.createElement("li"); //liタグを作成
        li.innerText = todoText; //liのテキストとしてユーザーが入力した値を取得して保管
        li.classList.add("list-group-item"); //classを追加

        if(todo && todo.completed){
            li.classList.add("text-decoration-line-through");
        }

        //liタグが右クリックされたらtodoを削除
        li.addEventListener("contextmenu",function(event){
            event.preventDefault(); //ここでは右クリックのデフォルト表示をブロックする
            li.remove();
            saveDate();
        });

        //クリックしたら斜線入れる
        li.addEventListener("click",function(){
            li.classList.toggle("text-black-50"); //toggleはクラス名があれば、クラス名を除去し、クラス名がなければ追加します。
            li.classList.toggle
            ("text-decoration-line-through");
            saveDate();
        });

        ul.appendChild(li); //ulタグの子供と指定したダグを追加
        input.value = "";  //入力フォームを空にする。
        saveDate();
    }
}

function saveDate(){
    const lists = document.querySelectorAll("li"); //配列で取得される
    let todos = [];

    lists.forEach(list=>{
        let todo = {     //斜線の有無も保存する。
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
