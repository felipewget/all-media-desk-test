import { useState } from 'react';
import { calculate, prepareEquation } from './../utils/calculatorUtil'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function Graph() {

    const [expression, setExpression] = useState('');
    const [graphData, setGraphData] = useState([]);

    const loadGraph = (numPoints = 100) => {

        setGraphData([]);

        const values = [...new Array(numPoints + 1)].map((_, index) => index);
        const graphPoints = values.map((point) => {
            const y = Number(calculate(prepareEquation(expression, point)));
            if (y.error) {
                return;
            }
            return { point, y, point: [point, y] };
        });

        const points = graphPoints.map((value) => value.point);
        setGraphData(points);

    }

    const labels = graphData.map((x) => x[0]);

    const graphJsx = () => (
        <>
            <p>Graph</p>
            <Line data={{
                labels,
                datasets: [
                    {
                        label: 'Graph Points X Y',
                        data: graphData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        yAxisID: 'y',
                    },
                ],
            }} />
        </>
    )

    return (
        <div>
            <input value={expression} onChange={(e) => setExpression(e.currentTarget.value)} />
            <button onClick={() => loadGraph()}>Load Graph</button>
            {
                graphData.length > 3
                    ? graphJsx()
                    : <p>Type right equation on the text field</p>
            }
        </div>
    );
}

export default Graph;
