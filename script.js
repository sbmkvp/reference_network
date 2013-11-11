$(document).ready(function() {
    var graph = Viva.Graph.graph();
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 50
    });

    $.each(data.nodes, function(key,val){
        var node =  {
            name: val.name,
        }
        graph.addNode(val.id, node);
    });
    $.each(data.links, function(key,val){
            graph.addLink(val.source, val.target);
    });

    var graphics = Viva.Graph.View.svgGraphics(),
    nodeSize = 20;

    graphics.node(function(node) {
        var size = 20;
        var ui = Viva.Graph.svg('g'),

        svgText = Viva.Graph.svg('text')
            .attr('x', (size/2)+13)
            .attr('y', 5+(20/2))
            .text("")
            .attr('fill', '#000000')
            .attr('font-family', 'Helvetica,Arial')
            .attr('font-size', size/2+'px'),
        circle = Viva.Graph.svg('circle')
            .attr('cx', nodeSize/2)
            .attr('cy', nodeSize/2)
            .attr('r', size/2)
            .attr('stroke-width', '2')
            .attr('stroke', 'white')
            .attr('fill', '#ff0000')
        ui.append(circle);
        ui.append(svgText);

        $(ui).hover(function() { svgText.text(node.data['name']); }, function() { svgText.text(""); });

        return ui;
    })
    .placeNode(function(nodeUI, pos, node) {
        nodeUI.attr('transform', 'translate(' + (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) + ')');
    });

    var renderer = Viva.Graph.View.renderer(graph, {
        graphics: graphics,
        layout : layout,
        container : document.getElementById('map')
    });

    renderer.run();
});