function getData() {
var data = {
    "nodes": [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
    ],
    "edges": [
        {"name":"1","start":"a","end":"b"},
        {"name":"2","start":"a","end":"c"},
        {"name":"3","start":"b","end":"c"},
        {"name":"4","start":"d","end":"e"},
        {"name":"5","start":"b","end":"i"},
        {"name":"6","start":"e","end":"c"},
        {"name":"7","start":"i","end":"h"},
        {"name":"8","start":"b","end":"h"},
        {"name":"9","start":"f","end":"e"},
        {"name":"10","start":"e","end":"i"},
        {"name":"11","start":"g","end":"h"}
    ]
}
return data;
}