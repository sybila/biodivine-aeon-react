import type {
  ComputationModes,
  ComputationStatus,
  DecisionNodeTypeTSSD,
  NodeDataTSSD,
  NodeDataTSSDWithMotifs,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
  StableMotifInfo,
  TimestampResponse,
} from '../../../../../types/types';
import type { TrapSpaceSuccessionDiagramInt } from '../../module-interfaces/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  // #region --- Props + Constructor ---

  private backendRequestFunction: (
    url: string,
    callback?: Function | undefined,
    method?: string,
    postData?: any
  ) => XMLHttpRequest;

  private startComputationCallback: (
    error: string | undefined,
    response: TimestampResponse | undefined,
    computationMode: ComputationModes,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined
  ) => void;

  private setWaitingForResult: (isWaiting: boolean) => void;

  constructor(
    backendRequestFunction: (
      url: string,
      callback?: Function | undefined,
      method?: string,
      postData?: any
    ) => XMLHttpRequest,
    startComputationCallback: (
      error: string | undefined,
      response: TimestampResponse | undefined,
      computationMode: ComputationModes,
      callback:
        | ((
            warning: string | undefined,
            error: string | undefined,
            engineStatus: string | undefined,
            compStatus: ComputationStatus | undefined,
            color: string | undefined
          ) => void)
        | undefined
    ) => void,
    setWaitingForResult: (isWaiting: boolean) => void
  ) {
    this.backendRequestFunction = backendRequestFunction;
    this.startComputationCallback = startComputationCallback;
    this.setWaitingForResult = setWaitingForResult;
  }

  // #endregion

  // #region --- Computation ---

  /** Start computation endpoint:
   *     -- /start_computation_trap_space
   *     -- POST
   *     -- starts trap space succession diagram computation, returns timestamp when the computation started
   *     -- callback = (error: string | undefined, response: TimestampResponse | undefined) => void
   *     -- post data = 'model' in the form of aeon string
   *     -- callback - (error: string | undefined, response: TimestampResponse | undefined) => void
   *     -- TimestampResponse object is object containing timestamp when the computation started, it has thi sstructure:
   *              export type TimestampResponse = {
                        timestamp: number | undefined;
                  };    
   *     -- error is string containing error message => if there was no error, error should be undefined, if there was an response object should be undefined
   */
  public startComputation(
    model: string,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ) {
    this.setWaitingForResult(true);

    /**
     * Example backend request:

    this.backendRequestFunction(
      '/start_computation_trap_space',
      (error: string | undefined, response: TimestampResponse | undefined) =>
        this.startComputationCallback(error, response, 'Trap Space', callback),
      'POST',
      model
    );

    */
  }

  // #endregion

  // #region --- Diagram Operations ---
  // TODO - remove when backend supports TSSD
  private tssdNodes: NodeDataTSSDWithMotifs =
    // --- Decision Node ID 0 ---
    {
      id: 0,
      variableValues: {
        CtrA: undefined,
        GcrA: undefined,
        SciP: undefined,
        DnaA: undefined,
      },
      numberOfInterpretations: 16,
      stableMotifs: [
        {
          id: 1,
          variableValues: {
            CtrA: 0,
            GcrA: 1,
            SciP: undefined,
            DnaA: undefined,
          },
          numberOfInterpretations: 4,
          numberOfMinTrapSpaces: 3,
          // Now points to multiple trap spaces (IDs 1 and 2)
          targetTrapSpaces: [
            {
              id: 2,
              variableValues: {
                CtrA: 0,
                GcrA: 1,
                SciP: 0,
                DnaA: undefined,
              },
              numberOfInterpretations: 4,
              stableMotifs: [],
              type: 'leaf',
            },
            {
              id: 3,
              variableValues: {
                CtrA: 0,
                GcrA: 1,
                SciP: undefined,
                DnaA: undefined,
              },
              numberOfInterpretations: 8,
              stableMotifs: [
                {
                  id: 4, // Changed ID to match leaf structure below for consistency
                  variableValues: {
                    CtrA: 0,
                    GcrA: 1,
                    SciP: 1,
                    DnaA: undefined,
                  },
                  numberOfInterpretations: 3,
                  numberOfMinTrapSpaces: 2,
                  // NOW HAS MORE THAN ONE TRAP SPACE ID
                  targetTrapSpaces: [
                    {
                      id: 5, // Added this leaf specifically for Node ID 2's motif
                      variableValues: {
                        CtrA: 0,
                        GcrA: 1,
                        SciP: 1,
                        DnaA: 1,
                      },
                      numberOfInterpretations: 1,
                      stableMotifs: [],
                      type: 'leaf',
                    },
                    {
                      id: 6, // Added this leaf specifically referenced in Node ID 2's second motif
                      variableValues: {
                        CtrA: 0,
                        GcrA: 1,
                        SciP: 0,
                        DnaA: 1,
                      },
                      numberOfInterpretations: 1,
                      stableMotifs: [],
                      type: 'leaf',
                    },
                  ],
                },
              ],
              type: 'trap-space-decision',
            },
          ],
        },
        {
          id: 7,
          variableValues: {
            CtrA: 1,
            GcrA: 0,
            SciP: undefined,
            DnaA: undefined,
          },
          numberOfInterpretations: 4,
          numberOfMinTrapSpaces: 2,
          // Points to a single trap space (ID 2 was shared with above, could change if needed)
          targetTrapSpaces: [
            {
              id: 8,
              variableValues: {
                CtrA: 1,
                GcrA: 0,
                SciP: 1,
                DnaA: undefined,
              },
              numberOfInterpretations: 4,
              stableMotifs: [],
              type: 'leaf',
            },
          ],
        },
      ],
      type: 'trap-space-decision',
    };

  /** TODO - remove this function in final implementation */
  private findNodeById(root: any, id: number): any | undefined {
    // Base case – the current node itself is the one we want
    if (root && typeof root.id === 'number' && root.id === id) {
      return root;
    }

    // 1️⃣  Look inside `stableMotifs` (these are decision nodes that can have
    //     their own `targetTrapSpaces` and nested `stableMotifs`).
    if (Array.isArray(root.stableMotifs)) {
      for (const motif of root.stableMotifs) {
        const found = this.findNodeById(motif, id);
        if (found) return found;
      }
    }

    // 2️⃣  Look inside `targetTrapSpaces` (these are the direct children – leaf
    //     nodes or further decisions).
    if (Array.isArray(root.targetTrapSpaces)) {
      for (const child of root.targetTrapSpaces) {
        const found = this.findNodeById(child, id);
        if (found) return found;
      }
    }

    // Not found in this branch
    return undefined;
  }

  /**
   * getTrapSpaceSuccessionDiagram endpoint:
   *    -- /get_trap_space_succession_diagram
   *    -- GET
   *    -- gets the current state of succession diagram (returns all nodes, currently present in the diagram in the form of tree - as recursive object structure), returns rootNode of the recursive object structure (this node should always be the root node of the succession diagram == trap space with all variables unpercolated)
   *    -- callback = callback: (error: string | undefined, rootNode: NodeDataTSSDWithMotifs | undefined) => void
   *    -- response rootNode is root of tree structure constructed recursively from objects of types NodeDataTSSDWithMotifs and StableMotifWithTrapSpaces
   *    -- NodeDataTSSDWithMotifs is defined like this:
   *            type NodeDataTSSDWithMotifs = {
                    id: number;
                    variableValues: TSSDNodeVariableValues;
                    numberOfInterpretations: number;
                    type: TrapSpaceType;
                    stableMotifs: Array<StableMotifWithTrapSpaces>;
                  };
        -- StableMotifWithTrapSpaces is defined like this:
              type StableMotifWithTrapSpaces = {
                  id: number;
                  variableValues: TSSDNodeVariableValues;
                  numberOfInterpretations: number;
                  numberOfMinTrapSpaces: number;
                  targetTrapSpaces: Array<NodeDataTSSDWithMotifs>;
                };
        -- error is string containing error message => if there was no error, error should be undefined, if there was an error rootNode should be undefined
   */
  public getTrapSpaceSuccessionDiagram(
    callback: (
      error: string | undefined,
      rootNode: NodeDataTSSDWithMotifs | undefined
    ) => void
  ): void {
    // TODO - remove this mock data when the endpoint is implemented in the compute engine. This is just to be able to work on the frontend part of the succession diagram before the backend is ready.
    callback(undefined, this.tssdNodes);

    /**
    Example call of the backend request:

    this.backendRequest(
      '/get_trap_space_succession_diagram',
      callback,
      'GET',
      null
    );
    */
  }

  /**
   * getDecisionsTSSD callback:
   *    -- /get_decisions_tssd/{sourceType}/{sourceId}
   *    -- GET
   *    -- returns all possible children nodes of the node with parentId (type of child nodes depends on the parent node -> if parent node is stable-motif, then children are trap-spaces, else if parent node is trap-space, then children are stable-motifs)
   *    -- sourceId is number indentifying trap-space or stable-motif for which we want to compute decisions = should be unique 
   *    -- sourceType is string identifying type of node for which we want to compute decisions, possible values are "trap-space-decision" and "stable-motif"
   *    -- callback: (error: string | undefined, decisions: NodesWithParentInfoTSSD | undefined) => void
   *    -- response are decisions in form of NodeWithParentInfoTSSD object, which has structure:
   *        
   *    type NodesWithParentInfoTSSD =
   *               | {
                      parentId: number;
                      parentType: 'trap-space-decision';
                      nodes: Array<StableMotifInfo>;
                    }
                  | {
                      parentId: number;
                      parentType: 'stable-motif';
                      nodes: Array<NodeDataTSSD>;
                    };
  
        -- error is string containing error message => if there was no error, error should be undefined, if there was an error decisions object should be undefined
   */
  public getDecisionsTSSD(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    callback: (
      error: string | undefined,
      decisions: NodesWithParentInfoTSSD | undefined
    ) => void
  ): void {
    let decisions: NodesWithParentInfoTSSD;

    if (sourceType == 'trap-space-decision') {
      const stableMotifs = this.findNodeById(
        this.tssdNodes,
        sourceId
      )!.stableMotifs;

      decisions = {
        parentId: sourceId,
        parentType: 'trap-space-decision',
        nodes: stableMotifs,
      };
    } else {
      const trapSpaces = this.findNodeById(
        this.tssdNodes,
        sourceId
      )!.targetTrapSpaces;

      decisions = {
        parentId: sourceId,
        parentType: 'stable-motif',
        nodes: trapSpaces,
      };
    }

    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    callback(undefined, decisions);

    /**
     Example backend request call:

    this.backendRequest(
      '/get_decisions_tssd/' + sourceType + '/' nodeId ,
      (error: string | undefined, decisions: NodesWithParentInfoTSSD | undefined) => {
        callback?.(error, decisions);
      },
      'GET'
    );

     */
  }

  /**
   * makeDecisionTSSD endpoint:
   *    -- /make_decision_tssd/' + sourceId + '/' + sourceType
   *    -- POST
   *    -- selects children nodes (defined by targetIds) of parentId node and adds them to succession diagram, returns list of node information about newly added nodes
   *    -- sourceId is id of node (trap-space or stable-motif) for which we are making decision
   *    -- sourceType is type of node for which we are making decision possible values are "trap-space-decision" and "stable-motif"
   *    -- post data = targetIds is array of node ids with which the diagram should be extended
   *    -- nodes corresponding to the targetIds ids should be:
   *          - stable motif nodes for sourceType "trap-space-decision"
   *          - trap space nodes (trap-space-decision" | "leaf") for source type "stable-motif"
   *    -- callback = (error: string | undefined, nodesToAdd: NodesWithParentInfoTSSD | undefined) => void
   *    -- response nodesToAdd is object of type NodesWithParentInfoTSSD containing information about source node and target nodes (target nodes should correspond to the targetIds)
   *    -- NodesWithParentInfoTSSD has structure:
   *          type NodesWithParentInfoTSSD =
   *               | {
                      parentId: number;
                      parentType: 'trap-space-decision';
                      nodes: Array<StableMotifInfo>;
                    }
                  | {
                      parentId: number;
                      parentType: 'stable-motif';
                      nodes: Array<NodeDataTSSD>;
                    };
        -- error is string containing error message => if there was no error, error should be undefined, if there was an error nodesToAdd object should be undefined
   */
  public makeDecisionTSSD(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    targetIds: Array<number>,
    callback: (
      error: string | undefined,
      nodesToAdd: NodesWithParentInfoTSSD | undefined
    ) => void
  ): void {
    let nodes: NodesWithParentInfoTSSD;

    const targetSet = new Set(targetIds);

    if (sourceType == 'trap-space-decision') {
      let stableMotifs = this.findNodeById(
        this.tssdNodes,
        sourceId
      )!.stableMotifs.filter((motif: StableMotifInfo) =>
        targetSet.has(motif.id)
      );

      nodes = {
        parentId: sourceId,
        parentType: 'trap-space-decision',
        nodes: stableMotifs,
      };
    } else {
      let trapSpaces = this.findNodeById(
        this.tssdNodes,
        sourceId
      )!.targetTrapSpaces.filter((trapSpace: NodeDataTSSD) =>
        targetSet.has(trapSpace.id)
      );

      nodes = {
        parentId: sourceId,
        parentType: 'stable-motif',
        nodes: trapSpaces,
      };
    }

    callback(undefined, nodes);

    /**
    Example request function call: 
     
    this.backendRequest(
      '/make_decision_tssd/' + sourceId + '/' + sourceType ,
      (
         error: string | undefined,
         nodesToAdd: NodesWithParentInfoTSSD | undefined
      ) => {
        if (callback !== undefined) {
          callback(error, nodesToAdd);
        }
      },
      'POST',
       targetIds
    );
*/
  }

  /**
   * deleteNodeTSSD endpoint:
   *    -- /delete_node_tssd/' + nodeType + '/' + nodeId
   *    -- POST
   *    -- removes node from the diagram, returns id and type of removed node
   *    -- callback = (
            error: string | undefined,
            removedNodeId: number,
            removedNodeType: NodeTypeTSSD) => void
        -- removedNodeId is id of removed node (should be the same as nodeId)
        -- removedNodeType is type of removed node (should be the same as nodeType)
        -- error is string containing error message => if there was no error, error should be undefined, if there was an error removedNodeId and removedNodeType should be undefined
   */
  public deleteNodeTSSD(
    nodeId: number,
    nodeType: NodeTypeTSSD,
    callback: (
      error: string | undefined,
      removedNodeId: number | undefined,
      removedNodeType: NodeTypeTSSD | undefined
    ) => void
  ): void {
    callback(undefined, nodeId, nodeType);

    /**
    Example request function call: 

    this.backendRequest(
      /delete_node_tssd/' + nodeType + '/' + nodeId,
      (
        error: string | undefined,
        removedNodeId: number | undefined,
        removedNodeType: NodeTypeTSSD | undefined
      ) => {
        if (callback !== undefined) {
          callback(error, removedNodeId, removedNodeType);
        }
      },
      'POST'
    );

    */
  }

  // #endregion
}

export default TrapSpaceSuccessionDiagram;
