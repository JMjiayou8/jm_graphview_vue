<template>
  <div>
    <div class="graphLegend">
      <p class="legend-title">流程图</p>
      <ul class="legend-list">
        <li v-for="item in graphState"
            :key="item.text"
            :span="4"
            class="legend-item">
          <i :style="`background:${item.color}`"></i>
          {{item.text}}
        </li>
      </ul>
    </div>
    <div class="flowContent"
         id="flowContent"
         ref="flowContent">
    </div>
  </div>

</template>
<script>
import mxgraph from '@/plugins/graph';
const { mxGraph, mxClient, mxUtils, mxRectangleShape, mxEditor, mxCodec, mxConstants, mxHierarchicalLayout, mxCircleLayout, mxFastOrganicLayout } = mxgraph;
import { decodeStr } from "@/assets/utils";
import { graphConfig } from "@/assets/utils/graphConfig";

const imgMap = {
  start: "start-activity",
  end: "end-activity",
  auto: "auto-activity",
  manual: "manual-activity",
  child_process: "child-process",
  line: "flow-connector1"
};
export default {
  name: 'graphComp',
  props: ["graphData", 'monitorData'],
  data () {
    return {
      graphState: [
        { text: "未处理", color: "#d8dde0" },
        { text: "已暂停", color: "#fac549" },
        { text: "运行中", color: "#51c6d2" },
        { text: "已出错", color: "#ec3334" },
        { text: "已完成", color: "#5a93d9" }
      ],
      editor: null,
      graph: null,
      parent: null
    };
  },

  mounted () {
    console.log(require('@/assets/images/auto-activity-error.png'))
    this.main(document.getElementById("flowContent"));
  },
  watch: {
    'monitorData.unfinishedActivityId' () {
      this.$refs.flowContent.innerHTML = ""
      this.main(document.getElementById("flowContent"));
    },
    'graphData' () {
      this.$refs.flowContent.innerHTML = ""
      this.main(document.getElementById("flowContent"));
    }
  },
  methods: {
    main (container) {
      let self = this;
      if (!mxClient.isBrowserSupported()) {
        mxUtils.error("Browser is not supported!", 200, false);
      } else {
        let node = mxUtils.parseXml(graphConfig);
        let root = node.documentElement;
        self.editor = new mxEditor(root);
        self.graph = new mxGraph(container, self.editor.graph.model);
        self.graph.getView().updateStyle = true;
        // 去锯齿效果
        mxRectangleShape.prototype.crisp = true;
        self.graph.setEnabled(false);
        // Label 将显示 Html 格式的 Value
        self.graph.setHtmlLabels(true);
        //设置默认样式
        self.setDefaultStyle();
        self.graph.container.style.backgroundImage =
          "url(" + require("@/assets/images/grid.png") + ")";
        //设置默认标签样式
        self.graph.convertValueToString = function (cell) {
          if (mxUtils.isNode(cell.value)) {
            let label =
              cell.getAttribute("activityName") ||
              cell.getAttribute("lineName") ||
              "";
            return decodeStr(label);
          } else if (cell.edge == 1) {
            return decodeStr(cell.lineName || "");
          }
          return "";
        };
        self.parent = self.graph.getDefaultParent();
        // 启动更新事务
        self.graph.getModel().beginUpdate();
        try {
          // 如果有数据，则渲染
          if (self.graphData) {
            let graphNode = mxUtils.parseXml(self.graphData);
            let root = graphNode.documentElement;
            let nodes = root.getElementsByTagName("Roundrect");
            for (let i = 0; i < nodes.length; i++) {
              let str = nodes[i].children[0].getAttribute("style");
              str = str.replace(
                /verticalLabelPosition=middle;verticalAlign=middle;/g,
                "verticalLabelPosition=bottom;verticalAlign=top;"
              );
              let type = nodes[i].getAttribute("cellType");
              let src = str.split("image=")[1];
              let state =
                ["-finish", "-running", "-pause", "-error", "-other"].filter(
                  key => src.indexOf(key) > -1
                )[0] || "-finish";
              nodes[i].children[0].setAttribute(
                "style",
                str.split("image=")[0] +
                "image="+
                require(`@/assets/images/${imgMap[type] + state}.png`)
                  // require(`@/assets/images/auto-activity-error.png`).replace(';','')
              );
            }
            let decoder = new mxCodec(graphNode);
            decoder.decode(root, self.graph.getModel());
            self.setLayout('horizontal')
          }
          self.loading = false;
        } finally {
          self.graph.getModel().endUpdate();
        }
      }
    },
    // 设置默认样式
    setDefaultStyle () {
      let self = this;
      let vertexStyle = self.graph.getStylesheet().getDefaultVertexStyle();
      vertexStyle["shape"] = "image";
      vertexStyle["verticalLabelPosition"] = "bottom";
      vertexStyle["verticalAlign"] = "top";
      vertexStyle["fontColor"] = "#000";
      vertexStyle["fontSize"] = "12";
      let edgeStyle = self.graph.getStylesheet().getDefaultEdgeStyle();
      edgeStyle[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
      edgeStyle[mxConstants.STYLE_STROKECOLOR] = "#666";
      edgeStyle[mxConstants.STYLE_DASHED] = true; //虚线
      edgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "#fff";
      edgeStyle[mxConstants.STYLE_LABEL_BORDERCOLOR] = "#E5E5E5";
      edgeStyle[mxConstants.STYLE_FONTCOLOR] = "#333";
      edgeStyle[mxConstants.STYLE_FONTSIZE] = "12";
      // style["edgeStyle"] = mxEdgeStyle.ElbowConnector;//连线曲折
    },
    //设置布局
    setExecute (layout) {
      let self = this;
      layout.execute(self.graph.getDefaultParent());
    },
    // 设置布局
    setLayout (command) {
      let self = this;
      switch (command) {
        case "vertical":
          self.setExecute(new mxHierarchicalLayout(self.graph));
          break;
        case "horizontal": {
          let layout = new mxHierarchicalLayout(self.graph, "west");
          self.setExecute(layout);
          break;
        }
        case "circle": {
          let circleLayout = new mxCircleLayout(self.graph);
          self.setExecute(circleLayout);
          break;
        }
        case "fit":
          self.graph.fit();
          self.graph.view.rendering = true;
          self.graph.refresh();
          break;
        case "organic": {
          let organic = new mxFastOrganicLayout(self.graph);
          organic.forceConstant = 80;
          self.setExecute(organic);
          break;
        }
      }
    }
  }
};
</script>
<style  scoped>
.graphLegend {
  background: #ffffff;
  border: 1px solid #cbcbcb;
  font-size: 12px;
  color: #333;
  line-height: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.graphLegend .legend-title {
  text-align: left;
}
.graphLegend .legend-list {
  display: flex;
}
.graphLegend .legend-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.graphLegend .legend-item i {
  width: 10px;
  height: 10px;
  display: block;
  border-radius: 50%;
  margin-right: 5px;
}

.flowContent {
  margin-top: 5px;
  width: 100%;
  overflow: auto;
  background: #f1f1f1;
  padding: 20px;
  box-sizing: border-box;
}
</style>


