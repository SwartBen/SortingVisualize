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
                worstcase: 'O(nlog(n))',
                averagecase: 'θ(nlog(n))',
                bestcase: 'Ω(nlog(n))'
            },
            'Quick Sort': {
                worstcase: 'O(n^2)',
                averagecase: 'θ(nlog(n))',
                bestcase: 'Ω(nlog(n))'
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
                this.quickSort(0, parseInt(this.arraySize - 1));
            } else if (this.selectedAlgorithm === 'Insertion Sort') {
                this.selectionSort();
            } else if (this.selectedAlgorithm === 'Merge Sort') {
                this.mergeSort(0, this.arraySize - 1)
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
                    await this.sleep();
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
                    await this.sleep(200)
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
                    await this.sleep(200);
                    //array[j+1] = array[j];
                    j = j-1;
                }
                Vue.set(vueinst.theArray, j+1, key)
                await this.sleep(200);
                //array[j+1] = key;
            }
        },
        //quicksort
        partition: async function(start, end){
            console.log(start, end);
            var temp;
            //Set last element as the pivot
            var pivotValue = vueinst.theArray[end];
            var pivotIndex = start; 
            for (var i = start; i < end; i++) {
                if (vueinst.theArray[i] < pivotValue) {
                //Swap elements
                temp = vueinst.theArray[i]
                Vue.set(vueinst.theArray, i, vueinst.theArray[pivotIndex])
                Vue.set(vueinst.theArray, pivotIndex, temp)
                await this.sleep(100)
                //Move to next element
                pivotIndex++;
                }
            }
            //Place pivot value in the middle
            temp = this.theArray[pivotIndex]
            Vue.set(vueinst.theArray, pivotIndex, vueinst.theArray[end])
            Vue.set(vueinst.theArray, end, temp)
            await this.sleep(100)

            return pivotIndex;
        },
        quickSort: async function(start, end) {
            //Base case
            if (start >= end) return;
            //Returns pivotIndex
            let index = await vueinst.partition(start, end)
            //Recursively apply same logic to left and right subarrays
            vueinst.quickSort(start, index - 1);
            vueinst.quickSort(index + 1, end);
        },
        //Merge Sort
        merge: async function(start, mid, end)
        {
            var start2 = mid + 1;
        
            // If the direct merge is already sorted
            if (vueinst.theArray[mid] <= vueinst.theArray[start2]) return;
        
            // Two pointers to maintain start of both arrays to merge
            while (start <= mid && start2 <= end) {
        
                // If element 1 is in right place
                if (vueinst.theArray[start] <= vueinst.theArray[start2]) {
                    start++;
                }
                else {
                    var value = vueinst.theArray[start2];
                    var index = start2;
        
                    // Shift all the elements between element 1 element 2, right by 1.
                    while (index != start) {
                        await this.sleep(200)
                        Vue.set(vueinst.theArray, index, vueinst.theArray[index-1])
                        index--;
                    }
                    await this.sleep(200)
                    Vue.set(vueinst.theArray, start, value)
        
                    //Update counters
                    start++; mid++; start2++;
                }
            }
        },
        mergeSort: function(l, r)
        {
            if (l < r) {
                var m = Math.floor((l + r) / 2);
        
                //Sort first and second halves
                this.mergeSort(l, m);
                this.mergeSort(m + 1, r);
                this.merge(l, m, r);
            }
        },
        //Set timeout
        sleep: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    //created
    created: function() {
        this.initArray();
    },
});