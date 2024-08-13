/*
if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
*/
const HashMap = () => {
	let mapSize = 16;
	let entry = 0;
	const hashMap = Array(mapSize);

	//Linked list node with key, value, and nextNode properties
	const Node = (key, value = null, nextNode = null) => {
		return {
			key,
			value,
			nextNode,
		};
	};

	//Hashes the key
	const hash = (key) => {
		let hashCode = 0;
		const primeNum = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode = primeNum * hashCode + (key.charCodeAt(i) % mapSize);
		}

		return hashCode;
	};

	//Sets value of key
	const set = (key, value) => {
		//Check for proper values
		if (!key || !value) return "Key value is not valid";

		//hash the key
		const hashKey = hash(key);
		//Set variable for hashKey inside of the hashmap, If there is no collision, this will be null
		let currentBucket = hashMap[hashKey];

		//If bucket is empty
		if (!currentBucket) {
			//set bucket to node with key value pair
			hashMap[hashKey] = Node(key, value);
			//increment entry counter
			entry++;
			return;
		}

		//If bucket is NOT empty, we have a collision

		//Set variable for current bucket
		let node = currentBucket;
		//While node is truthy
		while (node) {
			//If existing nodes key is equal to input key
			if (node.key === key) {
				//Override the existing value with input value
				node.value = value;
				return;
			}
			//if we reach end of linked list
			if (!node.nextNode) {
				//Add new node at tail
				node.nextNode = Node(key, value);
				//Increment entry counter
				entry++;
				return;
			}
			//Traverse linked list
			node = node.nextNode;
		}
	};

	//Returns value of key, or null if key is not in hashmap
	const get = (key) => {
		//Exit if key does not exist
		if (!key) return "Error: No key";

		//Hash the key
		const hashKey = hash(key);
		//Find the bucket that contains hashed key
		let bucket = hashMap[hashKey];
		// Set head node to that bucket
		let node = bucket;

		//While node is truthy
		while (node) {
			//Return value of node if keys match
			if (node.key === key) {
				return node.value;
			}

			//Traverse linked list
			node = node.nextNode;
		}

		//If input key was not found in linked list, returns null;
		return null;
	};

	//If key is in hashmap, return true, false if not;
	const has = (key) => {
		//Exit if key does not exist
		if (!key) return "Error: No key";

		//Hash the key
		const hashKey = hash(key);
		//Find the bucket that contains hashed key
		let bucket = hashMap[hashKey];
		// Set head node to that bucket
		let node = bucket;

		//Loop through linked list and return true if key is found
		while (node) {
			if (node.key === key) {
				return true;
			}
			node = node.nextNode;
		}
		return false;
	};

	// If key is in the hash map, removes the node and returns true. If no key in hash map, returns false
	const remove = (key) => {
		//Exit if key does not exist
		if (!key) return "Error: No key";

		//Hash the key
		const hashKey = hash(key);
		//Find the bucket that contains hashed key
		let bucket = hashMap[hashKey];

		if (!bucket) return false;
		// Set head node to that bucket
		let node = bucket;
		let previousNode = null;

		while (node) {
			if (node.key === key) {
				//If node is not head of list, remove it this way
				if (previousNode) {
					previousNode.nextNode = node.nextNode;
					//If node is head, remove this way.
				} else {
					hashMap[hashKey] = node.nextNode;
				}
				entry--;
				return true;
			}
			// walk through list while storing previous node
			previousNode = node;
			node = node.nextNode;
		}
		return false;
	};

	//Returns number of total keys in hash map
	const length = () => {
		let length = 0;
		for (let i = 0; i < hashMap.length; i++) {
			if (hashMap[i]) {
				let node = hashMap[i];

				while (node) {
					length++;
					node = node.nextNode;
				}
			}
		}
		return length;
	};

	//Clears hash map
	const clear = () => {
		for (let i = 0; i < hashMap.length; i++) {
			hashMap[i] = null;
		}
	};

	//Returns array of all keys
	const keys = () => {
		const arr = [];
		for (let i = 0; i < hashMap.length; i++) {
			if (hashMap[i]) {
				let node = hashMap[i];

				while (node) {
					arr.push(node.key);
					node = node.nextNode;
				}
			}
		}
		return arr;
	};

	//Returns array of all values
	const values = () => {
		const arr = [];
		for (let i = 0; i < hashMap.length; i++) {
			if (hashMap[i]) {
				let node = hashMap[i];

				while (node) {
					arr.push(node.value);
					node = node.nextNode;
				}
			}
		}
		return arr;
	};

    const entries = () => {
        const arr = [];
		for (let i = 0; i < hashMap.length; i++) {
            const pairArr = [];

			if (hashMap[i]) {
				let node = hashMap[i];

				while (node) {
					pairArr.push(node.key, node.value);
                    arr.push(pairArr);
					node = node.nextNode;
				}
			}
		}
		return arr;
    }
	return {
		hash,
		set,
		get,
		has,
		remove,
		entry,
		length,
		clear,
		keys,
		values,
		entries,
	};
};

export default HashMap;
