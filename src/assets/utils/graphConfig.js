const graphConfig = `<?xml version="1.0" encoding="UTF-8"?>
<mxEditor defaultGroup="group" defaultEdge="connector"> 
	<add as="onInit"><![CDATA[
		function (isFirstTime)
		{
			onInit(this, isFirstTime);
		}
	]]></add>  
	
	<Array as="templates">
		<add as="connector">
			<Connector label="" href="" cellType='connector' lineName=''  lineLeftValue='' lineOperator='' lineRightValue=''>
				<mxCell style="straight;strokeWidth=0.5" >
					<mxGeometry as="geometry" relative="1" />
				</mxCell>
			</Connector>
		</add>
		<add as="start">
			<Roundrect label="开始" href="" cellType='start' activityId='start' activityName='开始' autoFlag='Y' extending='N' execMethod='' execMethodParam='' backExecMethod='' backExecMethodParam='' childProcessFlag='N'>
				<mxCell vertex="1" style="rounded">		
					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		<add as="auto">
			<Roundrect label="自动节点" href="" cellType='auto' activityId='' activityName='自动节点' autoFlag='Y' extending='N' execMethod='' execMethodParam='' backExecMethod='' backExecMethodParam='' childProcessFlag='N' timeout=''>
				<mxCell vertex="1" style="rounded">		
					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		<add as="manual">
			<Roundrect label="人工节点" href="" cellType='manual' activityId='' activityName='人工节点' autoFlag='N' extending='N' execMethod='' execMethodParam='' backExecMethod='' backExecMethodParam='' childProcessFlag='N' timeout=''>
				<mxCell vertex="1" style="rounded">		
					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		<add as="child_process">
			<Roundrect label="子流程" href="" cellType='child_process' activityId='' activityName='子流程' autoFlag='Y' extending='N' execMethod='' execMethodParam='' backExecMethod='' backExecMethodParam='' childProcessFlag='Y'>
				<mxCell vertex="1" style="rounded">		
					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		<add as="end">
			<Roundrect label="结束" href="" cellType='end' activityId='end' activityName='结束' autoFlag='Y' extending='N' execMethod='' execMethodParam='' backExecMethod='' backExecMethodParam='' childProcessFlag='N'>
				<mxCell vertex="1" style="rounded">		
					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		
	</Array>
	<mxGraph as="graph" alternateEdgeStyle="verticalConnector" allowLoops="1" dropEnabled="1">
		<mxGraphModel as="model">
			<root>
				<Diagram processName="My Process" processDesc="" processAuthor="" shortProcessFlag="Y" processTransactionType="N" groupName="默认业务组" href="http://www.mxgraph.com/" id="0">
					<mxCell/>
				</Diagram>
				<Layer processId="Default Layer" id="1">
					<mxCell parent="0"/>
				</Layer>
			</root>
		</mxGraphModel>
	</mxGraph>   
</mxEditor>`
const graphStyleConfig = `<?xml version="1.0" encoding="UTF-8"?>
<mxStylesheet>
	<add as="defaultVertex" extend="defaultVertex">
		<add as="strokeColor" value="#666666"/>
		<add as="fillColor" value="#C3D9FF"/>
		<add as="gradientColor" value="#FFFFFF"/>
	</add>
	<add as="defaultEdge" extend="defaultEdge">
		<add as="labelBackgroundColor" value="white"/>
		<add as="rounded" value="1"/>
		<add as="edgeStyle" value="elbowEdgeStyle"/>
	</add>
	<add as="entity" extend="defaultEdge">
		<add as="edgeStyle" value="entityRelationEdgeStyle"/>
	</add>
	<add as="vertical" extend="defaultEdge">
		<add as="elbow" value="vertical"/>
	</add>
	<add as="straight" extend="defaultVertex">
		<add as="shape" value="connector"/>
		<add as="endArrow" value="classic"/>
	</add>
	<add as="arrow" extend="defaultVertex">
		<add as="shape" value="arrow"/>
	</add>
	<add as="swimlane" extend="defaultVertex">
		<add as="shape" value="swimlane"/>
		<add as="fontSize" value="12"/>
		<add as="fontStyle" value="1"/>
		<add as="startSize" value="23"/>
	</add>
	<add as="triangle" extend="defaultVertex">
		<add as="shape" value="triangle"/>
		<add as="perimeter" value="trianglePerimeter"/>
	</add>
	<add as="line" extend="defaultVertex">
		<add as="shape" value="line"/>
		<add as="strokeWidth" value="4"/>
		<add as="labelBackgroundColor" value="white"/>
		<add as="verticalAlign" value="top"/>
		<add as="spacingTop" value="8"/>
	</add>
	<add as="image" extend="defaultVertex">
		<add as="shape" value="image"/>
		<add as="labelBackgroundColor" value="white"/>
		<add as="verticalLabelPosition" value="bottom"/>
		<add as="verticalAlign" value="top"/>
	</add>
	<add as="roundImage" extend="image">
		<add as="perimeter" value="ellipsePerimeter"/>
	</add>
	<add as="rhombusImage" extend="image">
		<add as="perimeter" value="rhombusPerimeter"/>
	</add>
</mxStylesheet>
`
export {
	graphConfig,graphStyleConfig
}

