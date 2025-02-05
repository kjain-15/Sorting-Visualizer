// Get references to DOM elements
const arrayContainer = document.getElementById('array-container');
const speedSlider = document.getElementById('speed');
const sizeSlider = document.getElementById('size');
const algorithmSelect = document.getElementById('algorithm');
const descriptionDiv = document.getElementById('description');

let array = [];
let delay = 1000 / speedSlider.value;

// Adjust delay based on speed input
speedSlider.oninput = () => {
    delay = 1000 / speedSlider.value;
};

// Generate a new array when size changes or when "Generate New Array" is clicked
sizeSlider.oninput = () => generateArray(parseInt(sizeSlider.value));
document.getElementById('generate').onclick = () => generateArray(parseInt(sizeSlider.value));

// Start sorting when the "Start Sorting" button is clicked
document.getElementById('sort').onclick = async () => {
    disableControls(false);  // Disable controls during sorting

    // Display description based on selected algorithm
    switch (algorithmSelect.value) {
        case 'bubble':
            descriptionDiv.innerHTML = ` 
                <ul>
                <li>Bubble Sort:Traverse from left and compare adjacent elements and the higher one is placed at right side. In this way, the largest element is moved to the rightmost end at first. This process is then continued to find the second largest and place it and so on until the data is sorted.</li>
                    <li>In-place(An in-place algorithm is an algorithm that does not need an extra space and produces an output in the same memory that contains the data by transforming the input ‘in-place’. However, a small constant extra space used for variables is allowed.): Yes</li>
                    <li>Stable(A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input data set): Yes</li>
                    <li>Time Complexity: O(n^2)</li>
                </ul>`;
            await bubbleSort();
            break;
        case 'selection':
            descriptionDiv.innerHTML = `
            <ul>
            <li>Selection Sort: In selection sort, the first smallest element is selected from the unsorted array and placed at the first position. After that second smallest element is selected and placed in the second position. The process continues until the array is entirely sorted.</li> 
                    <li>In-place(An in-place algorithm is an algorithm that does not need an extra space and produces an output in the same memory that contains the data by transforming the input ‘in-place’. However, a small constant extra space used for variables is allowed.): Yes</li>
                    <li>Stable(A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input data set): No</li>
                    <li>Time Complexity: O(n^2)</li>
                </ul>`;
            await selectionSort();
            break;
        case 'insertion':
            descriptionDiv.innerHTML = `
            <ul>
            <li>Insertion Sort: Insertion sort works similar to the sorting of playing cards in hands. It is assumed that the first card is already sorted in the card game, and then we select an unsorted card. If the selected unsorted card is greater than the first card, it will be placed at the right side; otherwise, it will be placed at the left side. Similarly, all unsorted cards are taken and put in their exact place.</li> 
                    <li>In-place(An in-place algorithm is an algorithm that does not need an extra space and produces an output in the same memory that contains the data by transforming the input ‘in-place’. However, a small constant extra space used for variables is allowed.): Yes</li>
                    <li>Stable(A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input data set): Yes</li>
                    <li>Time Complexity: O(n^2)</li>
                </ul>`;
            await insertionSort();
            break;
        case 'quick':
            descriptionDiv.innerHTML = `
            <ul>
            <li>Quick Sort: Quicksort picks an element as pivot, and then it partitions the given array around the picked pivot element. In quick sort, a large array is divided into two arrays in which one holds values that are smaller than the specified value (Pivot), and another array holds the values that are greater than the pivot. After that, left and right sub-arrays are also partitioned using the same approach. It will continue until the single element remains in the sub-array.</li> 
                    <li>In-place(An in-place algorithm is an algorithm that does not need an extra space and produces an output in the same memory that contains the data by transforming the input ‘in-place’. However, a small constant extra space used for variables is allowed.): Yes</li>
                    <li>Stable(A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input data set): No</li>
                    <li>Time Complexity: O(n log n)</li>
                </ul>`;
            await quickSort(0, array.length - 1);
            break;
        case 'merge':
            descriptionDiv.innerHTML = `
            <ul>
            <li>Merge Sort: Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.</li> 
                    <li>In-place(An in-place algorithm is an algorithm that does not need an extra space and produces an output in the same memory that contains the data by transforming the input ‘in-place’. However, a small constant extra space used for variables is allowed.): No</li>
                    <li>Stable(A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input data set): Yes</li>
                    <li>Time Complexity: O(n log n)</li>
                </ul>`;
            await mergeSort(0, array.length - 1);
            break;
    }

    disableControls(false);  // Re-enable controls after sorting
};

// Generate an array of random values
function generateArray(size) {
    arrayContainer.innerHTML = '';
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        bar.classList.add('bar');
        bar.style.width = `calc(100% / ${size} - 2px)`;
        arrayContainer.appendChild(bar);
    });
}

// Sleep function for delays in visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to change the color of bars being compared
async function compare(bar1, bar2) {
    bar1.style.backgroundColor = '#33A1FF';  // Color for comparison (blue)
    bar2.style.backgroundColor = '#33A1FF';  // Color for comparison (blue)

    await sleep(delay);  // Wait to visualize the comparison

    // Revert the color back to the original color after comparison
    bar1.style.backgroundColor = '#61ffdf';  // Original color
    bar2.style.backgroundColor = '#61ffdf';  // Original color
}

// Swap function to swap the heights of two bars and change their color temporarily
async function swap(bar1, bar2) {
    // Change the color of the bars to indicate a swap
    bar1.style.backgroundColor = '#FFBB33';  // Color for swapping (yellow-orange)
    bar2.style.backgroundColor = '#FFBB33';  // Color for swapping (yellow-orange)

    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;

    await sleep(delay);  // Wait for the swap to visualize

    // Revert the color back to the original color after the swap
    bar1.style.backgroundColor = '#61ffdf';
    bar2.style.backgroundColor = '#61ffdf';
}

// Disable or enable the controls during sorting
function disableControls(disable) {
    document.getElementById('generate').disabled = disable;
    document.getElementById('sort').disabled = disable;
    algorithmSelect.disabled = disable;
    speedSlider.disabled = disable;
    sizeSlider.disabled = disable;
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await compare(bars[j], bars[j + 1]);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await swap(bars[j], bars[j + 1]);
            }
        }
    }
}

// Selection Sort
async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        // Highlight the current element being compared
        bars[i].style.backgroundColor = '#33A1FF';  // Blue for current element

        for (let j = i + 1; j < array.length; j++) {
            // Highlight the element being compared to the current element
            bars[j].style.backgroundColor = '#33A1FF';  // Blue for compared element

            await sleep(delay);  // Wait to visualize comparison

            if (array[j] < array[minIndex]) {
                // Change color to indicate a new minimum
                bars[minIndex].style.backgroundColor = '#FF6F61';  // Original color for minIndex
                minIndex = j;
                bars[minIndex].style.backgroundColor = '#FFBB33';  // Yellow for new minimum
            } else {
                // Revert color for elements that are not the new minimum
                bars[j].style.backgroundColor = '#FF6F61';
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            await swap(bars[i], bars[minIndex]);
        }

        // Revert the color of the sorted element
        bars[i].style.backgroundColor = '#61ffe7';
    }
}

// Insertion Sort
async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            await compare(bars[j], bars[j + 1]);
            array[j + 1] = array[j];
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            await sleep(delay);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        await sleep(delay);
    }
}

// Quick Sort
async function quickSort(start, end) {
    if (start < end) {
        let pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    }
}

async function partition(start, end) {
    let pivot = array[end];
    let i = start - 1;
    const bars = document.getElementsByClassName('bar');
    for (let j = start; j < end; j++) {
        await compare(bars[j], bars[j + 1]);
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            await swap(bars[i], bars[j]);
        }
    }
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    await swap(bars[i + 1], bars[end]);
    return i + 1;
}

// Merge Sort
async function mergeSort(start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    let leftArray = array.slice(start, mid + 1);
    let rightArray = array.slice(mid + 1, end + 1);
    let leftIndex = 0, rightIndex = 0, mainIndex = start;
    const bars = document.getElementsByClassName('bar');

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        await compare(bars[mainIndex], bars[mainIndex + 1]);
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            array[mainIndex] = leftArray[leftIndex++];
        } else {
            array[mainIndex] = rightArray[rightIndex++];
        }
        bars[mainIndex].style.height = `${array[mainIndex] * 3}px`;
        mainIndex++;
        await sleep(delay);
    }

    while (leftIndex < leftArray.length) {
        array[mainIndex++] = leftArray[leftIndex++];
        bars[mainIndex - 1].style.height = `${array[mainIndex - 1] * 3}px`;
        await sleep(delay);
    }

    while (rightIndex < rightArray.length) {
        array[mainIndex++] = rightArray[rightIndex++];
        bars[mainIndex - 1].style.height = `${array[mainIndex - 1] * 3}px`;
        await sleep(delay);
    }
}
