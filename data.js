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
        {"name":"4","start":"a","end":"e"},
        {"name":"5","start":"b","end":"i"},
        {"name":"6","start":"e","end":"c"},
        {"name":"7","start":"a","end":"h"},
        {"name":"8","start":"b","end":"h"},
        {"name":"9","start":"a","end":"e"},
        {"name":"10","start":"a","end":"i"},
        {"name":"11","start":"g","end":"h"},
        {"name":"12","start":"a","end":"f"},
        {"name":"13","start":"a","end":"d"},
    ]
}
return data;
}