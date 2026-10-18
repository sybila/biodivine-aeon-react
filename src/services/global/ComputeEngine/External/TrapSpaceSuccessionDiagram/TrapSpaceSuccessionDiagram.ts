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
import type { TrapSpaceSuccessionDiagramInt } from '../../module-interfaces/TrapSpaceSuccessionDiagramInt';

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

    this.backendRequestFunction(
      '/start_computation',
      (error: string | undefined, response: TimestampResponse | undefined) =>
        this.startComputationCallback(error, response, 'Trap Space', callback),
      'POST',
      model
    );
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
      numberOfInterpretations: 16, // Increased to support more branches/motifs
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

  public getTrapSpaceSuccessionDiagram(
    model: string,
    callback: (
      error: string | undefined,
      rootNode: NodeDataTSSDWithMotifs | undefined
    ) => void
  ): void {
    // TODO - remove this mock data when the endpoint is implemented in the compute engine. This is just to be able to work on the frontend part of the succession diagram before the backend is ready.
    callback(undefined, this.tssdNodes);
    // TODO - implement this endpoint in the compute engine and uncomment the backend request. For now, this function will return an error to avoid confusion.
    // this.backendRequest(
    //   '/get_trap_space_succession_diagram',
    //   callback,
    //   'GET',
    //   null
    // );
  }

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
        parentType: 'trap-space',
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
    // this.backendRequest(
    //   '/get_attributes_tssd/' + nodeId,
    //   (error: string | undefined, response: DecisionsTSSD | undefined) => {
    //     callback?.(error, response);
    //   },
    //   'GET'
    // );
  }

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
        parentType: 'trap-space',
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

    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    // this.backendRequest(
    //   '/make_decision_tssd/' + nodeId + '/' + decisionId,
    //   (
    //     error: string | undefined,
    //     response: NodeDataTSSD[] | undefined
    //   ) => {
    //     if (callback !== undefined) {
    //       callback(error, response);
    //     }
    //   },
    //   'POST'
    // );
  }

  public deleteNodeTSSD(
    nodeId: number,
    nodeType: NodeTypeTSSD,
    callback: (
      error: string | undefined,
      nodeId: number,
      nodeType: NodeTypeTSSD,
      removedNodeId: number
    ) => void
  ): void {
    callback(undefined, nodeId, nodeType, nodeId);
    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    // this.backendRequest(
    //   '/revert_decision_tssd/' + nodeId,
    //   (
    //     error: string | undefined,
    //     response: DeleteBifDecisionResponse | undefined
    //   ) => {
    //     if (callback !== undefined) {
    //       callback(error, response?.node ?? undefined, response?.removed ?? []);
    //     }
    //   },
    //   'POST'
    // );
  }

  // #endregion
}

export default TrapSpaceSuccessionDiagram;
