var sigRoot = document.getElementById('sig');
var sigInst = sigma.init(sigRoot);
sigInst.drawingProperties({
  defaultLabelColor: '#ccc',
  font: 'Arial',
  edgeColor: 'source',
  defaultEdgeType: 'straight'
}).graphProperties({
  minNodeSize: 4,
  maxNodeSize: 10
});

var data = getData();

for (i in data.nodes) {
	sigInst.addNode(data.nodes[i],{
	  x: Math.random(),
	  y: Math.random(),
	})
};

for (i in data.edges) {
	sigInst.addEdge(data.edges[i].name,data.edges[i].start,data.edges[i].end);
};

sigInst.draw();
sigInst.startForceAtlas2();
