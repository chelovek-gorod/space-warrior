import Text from './classes/Text.js';
import canvas from './canvas.js';

class CounterPerformance extends Text {
    constructor() {
        super('Performance', 2, canvas.height - 12, {size: 10, font: 'PTSans'});
        this.updateTimeoutPerformance = 500;
        this.currentTimePerformance = 0;
        this.performanceTestStartTime = 0;
        this.performanceArr = [];
    }

    start() {
        this.performanceTestStartTime = performance.now();
    }

    update(dt) {
        this.performanceArr.push( performance.now() - this.performanceTestStartTime );
        this.currentTimePerformance += dt;
        if (this.currentTimePerformance >= this.updateTimeoutPerformance) {
            let performancesSum = 0;
            for(let i = 0; i < this.performanceArr.length; i++) {
                performancesSum += this.performanceArr[i];
            }
            const performanceText = `Performance: ${(performancesSum / this.performanceArr.length).toFixed(3)} ms`;
            this.render(performanceText);
            this.performanceArr.length = 0;
            this.currentTimePerformance = 0;
        }
        this.draw();
    }
}

const counterPerformance =  new CounterPerformance();
export default counterPerformance;