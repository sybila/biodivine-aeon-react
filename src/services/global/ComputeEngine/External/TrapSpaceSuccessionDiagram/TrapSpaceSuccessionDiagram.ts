import type {
  ComputationModes,
  ComputationStatus,
  DecisionsTSSD,
  NodeDataTSSD,
  NodeDataTSSDWithMotifs,
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
  private tssdNodes: NodeDataTSSDWithMotifs[] = [
    {
      id: 0,
      variableValues: {
        A: undefined,
        B: undefined,
        C: undefined,
        D: undefined,
      },
      cardinality: 8,
      stableMotifs: [
        {
          id: 0,
          variableValues: {
            A: 1,
            B: 0,
            C: undefined,
            D: undefined,
          },
          numberOfInterpretations: 4,
          numberOfMinTrapSpaces: 3,
          targetNodeId: 1,
        },
        {
          id: 1,
          variableValues: {
            A: 0,
            B: 1,
            C: undefined,
            D: undefined,
          },
          numberOfInterpretations: 4,
          numberOfMinTrapSpaces: 2,
          targetNodeId: 2,
        },
      ],
      type: 'decision',
    },
    {
      id: 1,
      variableValues: {
        A: 1,
        B: 0,
        C: 1,
        D: undefined,
      },
      cardinality: 4,
      stableMotifs: [],
      type: 'leaf',
    },
    {
      id: 2,
      variableValues: {
        A: 0,
        B: 1,
        C: 1,
        D: undefined,
      },
      cardinality: 4,
      stableMotifs: [
        {
          id: 2,
          variableValues: {
            A: 0,
            B: 1,
            C: 1,
            D: 1,
          },
          numberOfInterpretations: 3,
          numberOfMinTrapSpaces: 1,
          targetNodeId: 3,
        },
        {
          id: 3,
          variableValues: {
            A: 0,
            B: 1,
            C: 1,
            D: 0,
          },
          numberOfInterpretations: 1,
          numberOfMinTrapSpaces: 1,
          targetNodeId: 4,
        },
      ],
      type: 'decision',
    },
    {
      id: 3,
      variableValues: {
        A: 0,
        B: 1,
        C: 1,
        D: 1,
      },
      cardinality: 3,
      stableMotifs: [],
      type: 'leaf',
    },
    {
      id: 4,
      variableValues: {
        A: 0,
        B: 1,
        C: 1,
        D: 0,
      },
      cardinality: 1,
      stableMotifs: [],
      type: 'leaf',
    },
  ];

  public getTrapSpaceSuccessionDiagram(
    model: string,
    callback: (
      error: string | undefined,
      nodes: NodeDataTSSDWithMotifs[] | undefined
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
    nodeId: number,
    callback: (
      error: string | undefined,
      decisions: DecisionsTSSD | undefined
    ) => void
  ): void {
    let stableMotifs = this.tssdNodes[nodeId].stableMotifs;

    const decisions = stableMotifs.map((motif) => {
      return {
        ...motif,
        possibleChildNodes: [this.tssdNodes[motif.targetNodeId]],
      };
    });

    // TODO - implement this endpoint in the compute engine and uncomment the backend request.

    // This callback should return array of stable motif objects.
    // Each stable motif object contains:
    // id (number) - id of the stable motif
    // variableValues: Record containing variable names and their percolated values (1 - true, 0 - false). If variable is not present, then is unpercolated (free)
    // numberOfInterpretations: For how many interpretations of the model is the stable motif valid.
    // numberOfMinTrapSpaces: How many different minimal trap spaces is reachable after selecting this stable motif
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
    nodeId: number,
    decisionId: number,
    callback: (
      error: string | undefined,
      node: NodeDataTSSD | undefined
    ) => void
  ): void {
    callback(
      undefined,
      this.tssdNodes[
        this.tssdNodes[
          nodeId % 2 === 1 ? nodeId - 1 : nodeId - 2
        ].stableMotifs.find((motif) => motif.id === decisionId)?.targetNodeId ??
          0
      ]
    );

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

  public deleteDecisionTSSD(
    node: NodeDataTSSDWithMotifs,
    callback: (
      error: string | undefined,
      node: NodeDataTSSDWithMotifs | undefined,
      removedNodes: number[]
    ) => void
  ): void {
    let filterFunction: (node: NodeDataTSSDWithMotifs) => boolean = () => true;

    switch (node.id) {
      case 0:
        filterFunction = (node) => node.id > 0;
        break;
      case 1:
        filterFunction = (node) => true;
        break;
      case 2:
        filterFunction = (node) => node.id > 2;
        break;
      case 3:
        filterFunction = (node) => true;
        break;
      case 4:
        filterFunction = (node) => true;
        break;
    }

    callback(
      undefined,
      node,
      this.tssdNodes.filter(filterFunction).map((node) => node.id)
    );
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
