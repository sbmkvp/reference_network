$(document).ready(function() {
    var graph = Viva.Graph.graph();
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 120
    });
    var countryColor = "#34495E";
    var conceptColor = "#3498DB"; // #C0392B
    var url = "http://refnet.localhost//graph.json?callback=haydi";
    var focusDisplay = false;
    var focusNodeId;

    $.getJSON(url, function(data){
        $.each(data.nodes, function(key,val){
            var node =  { name: val.nodeName,
                type: val.type,
                degree: val.degree,
                isPinned: val.focus 
            }
            if(focusDisplay){
                graph.addNode(val.id, node);
            } else {
                if(val.focus == true){
                    focusNodeId = val.id;
                }
                if(val.focus == false){
                    graph.addNode(val.id, node);
                }
            }
        });
        $.each(data.links, function(key,val){
            if(focusDisplay){
                graph.addLink(val.source, val.target, val.value);
            }else{
                if(val.source != focusNodeId && val.target != focusNodeId){
                    graph.addLink(val.source, val.target, val.value);
                }
            }
        });
    });

    var graphics = Viva.Graph.View.svgGraphics(),
    nodeSize = 20,

    highlightRelatedNodes = function(nodeId, isOn) {
        graph.forEachLinkedNode(nodeId, function(node, link){
            if (link && link.ui) {
                link.ui.attr('stroke-opacity', isOn ? '1' : '0.3');
                if(isOn){
                    node.ui.childNodes[0].attr('fill', node.data['type'] == "Question" ? conceptColor : countryColor);
                }else{
                    node.ui.childNodes[0].attr('stroke', 'white').attr('fill', node.data['type'] == "Question" ? conceptColor : countryColor);
                }
            }   
        });
    };

    muteUnrelatedNodes = function(nodeId, isOn) {
        graph.forEachUnlinkedNode(nodeId, function(node){
            if(nodeId != node.id){
                node.ui.childNodes[0].attr('opacity', isOn ? '0.1' : '1');
                node.ui.childNodes[1].attr('opacity', isOn ? '0.1' : '1');
            }
        });
    };

    graphics.node(function(node) {
        var size = nodeSize + (2*node.data['degree']);
        var ui = Viva.Graph.svg('g'),

        svgText = Viva.Graph.svg('text')
            .attr('x', (size/2)+13)
            .attr('y', 5+(nodeSize/2))
            .text(node.data['name'])
            .attr('fill', node.data['type'] == "Question" ? conceptColor : countryColor)
            .attr('font-family', 'Helvetica,Arial')
            .attr('font-size', size/2+'px'),
        rec = Viva.Graph.svg('rect')
            .attr('width', size/2)
            .attr('height', size/2)
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('stroke-width', '2'),
        ellipse = Viva.Graph.svg('ellipse')
            .attr('cx', size/2)
            .attr('cy', size/2)
            .attr('rx', size/4)
            .attr('ry', size/4)
            .attr('stroke-width', '2')
            .attr('stroke', 'white')
            .attr('fill', node.data['type'] == "Question" ? 'gray' : 'red'),
        circle = Viva.Graph.svg('circle')
            .attr('cx', nodeSize/2)
            .attr('cy', nodeSize/2)
            .attr('r', size/2)
            .attr('stroke-width', '2')
            .attr('stroke', 'white')
            .attr('fill', node.data['type'] == "Question" ? conceptColor : countryColor);
        ui.append(circle);
        ui.append(svgText);
        $(ui).hover(function() {
            highlightRelatedNodes(node.id, true);
            muteUnrelatedNodes(node.id, true);
            svgText.attr('display', 'display');
            circle.attr('fill', 'white').attr('stroke', node.data['type'] == "Question" ? conceptColor : countryColor);
            $(this).css( 'cursor', 'pointer' );
        }, function() {
            highlightRelatedNodes(node.id, false);
            muteUnrelatedNodes(node.id, false);
            circle.attr('stroke', 'white')
            .attr('fill', node.data['type'] == "Question" ? conceptColor : countryColor);
            $(this).css( 'cursor', 'default' );
        });
        return ui;
    })
    .placeNode(function(nodeUI, pos, node) {
        nodeUI.attr('transform', 'translate(' + (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) + ')');
    });

    graphics.link(function(link){
        return Viva.Graph.svg('line')
        .attr('stroke', '#7F8C8D')
        .attr('stroke-opacity', '0.3')
        .attr('stroke-width', Math.sqrt(link.data));
    });

    var renderer = Viva.Graph.View.renderer(graph, {
        graphics : graphics,
        layout : layout,
        container : document.getElementById('map')
    });
    renderer.run();
});