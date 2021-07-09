var vueinst = new Vue({
    el: "#app",
    data: {
        selectedAlgorithm: "",
        arraySize: "50",
        theArray: [],
        complexity: {
            'Selection Sort': {
                worstcase: 'O(n^2)',
                averagecase: 'θ(n^2)',
                bestcase: 'Ω(n^2)'
            },
            'Bubble Sort': {
                worstcase: 'O(n^2)',
                averagecase: 'θ(n^2)',
                bestcase: 'Ω(n)'
            },
            'Insertion Sort': {
                worstcase: 'O(n^2)',
                averagecase: 'θ(n^2)',
                bestcase: 'Ω(n)'
            },
            'Distribution Sort': {
                worstcase: 'O(log(n))',
                averagecase: 'O(log(n))',
                bestcase: 'O(log(n))'
            },
            'Merge Sort': {
                worstcase: 'O(n log(n))',
                averagecase: 'θ(n log(n))',
                bestcase: 'Ω(n log(n))'
            },
            'Quick Sort': {
                worstcase: 'O(n^2)',
                averagecase: 'θ(n log(n))',
                bestcase: 'Ω(n log(n))'
            },
            '': {
                worstcase: "",
                averagecase: "",
                bestcase: ""
            }
        },
        currentComplexity: "",
        statistics: {
            comparisons: 0,
            arrayaccesses: 0
        }
    },
    methods: {
        bindSelected: function(selected) {
            this.selectedAlgorithm = selected
            vueinst.currentComplexity = this.complexity[selected]
        },
        startSort: function() {
            if(this.selectedAlgorithm === 'Selection Sort') {
                this.selectionSort();
            } else if (this.selectedAlgorithm === 'Bubble Sort') {
                this.bubbleSort();
            } else if (this.selectedAlgorithm === 'Quick Sort') {
                this.quickSort(0, this.arraySize-1);
            } else if (this.selectedAlgorithm === 'Insertion Sort') {
                this.selectionSort();
            }
        },
        generateArray: function() {
            this.arraySize = document.getElementById('slider').value

            this.theArray = [];
            for (var i=0; i<this.arraySize; i++) {
                this.theArray[i] = Math.floor(Math.random() * (200 - 5 + 1)) + 5;
            }
        },
        initArray: function() {
            for (var i=0; i<this.arraySize; i++) {
                this.theArray[i] = Math.floor(Math.random() * (200 - 5 + 1)) + 5;
            }
        },
        selectionSort: async function() {
            //For visual:
            //sorted - green
            //current val - blue
            //current lowest - red 
            //starting - grey

            var indexMin, j, i
            for (i = 0; i < this.arraySize; i++) {
                // Set current element as min
                indexMin = i

                // Loop through rest of array, checking if theres an element smaller than indexMin	
                for (j = i + 1; j < this.arraySize; j++) {
                    vueinst.statistics.comparisons++;
                    if (this.theArray[indexMin] > this.theArray[j]) {
                        indexMin = j
                    }
                }
                // If a min element been located thats not the original swap the orignal with the new min element
                if (indexMin != i) {
                    var temp = this.theArray[indexMin]
                    Vue.set(vueinst.theArray, indexMin, vueinst.theArray[i])
                    Vue.set(vueinst.theArray, i, temp)
                    vueinst.statistics.arrayaccesses++
                    await this.sleep(200);
                }
            }
        },
        bubbleSort: async function() {
            for(var i=0;i< this.arraySize - 1; i++) {
                for(var j=0; j< this.arraySize-i-1; j++) {
                    if(this.theArray[j] > this.theArray[j+1]) {
                        var temp = this.theArray[j]
                        Vue.set(vueinst.theArray, j, vueinst.theArray[j+1])
                        Vue.set(vueinst.theArray, j+1, temp)
                        vueinst.statistics.arrayaccesses++
                        await this.sleep(50)
                    }
                    vueinst.statistics.comparisons++;
                }
            }
        },
        insertionSort: async function() {
            var j = 0, key;

            for (var i = 1; i < arraySize; i++) {
                key = this.theArray[i]; // picking the element
                j = i - 1;  // one pos. to left of key

                while(j >= 0 && theArray[j] > key) {
                    Vue.set(vueinst.theArray, j+1, vueinst.theArray[j])
                    this.sleep(200);
                    //array[j+1] = array[j];
                    j = j-1;
                }
                Vue.set(vueinst.theArray, j+1, key)
                this.sleep(200);
                //array[j+1] = key;
            }
        },

        sleep: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    //created
    created: function() {
        this.initArray();
    },
});