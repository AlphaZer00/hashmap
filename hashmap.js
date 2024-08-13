/*
if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
*/
const HashMap = () => {
	let mapSize = 16;
	let entries = 0;
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
			entries++;
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
				entries++;
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
		if (key) {
			return true;
		} else {
			return false;
		}
	};

	return {
		hash,
		set,
		get,
		has,
	};
};

export default HashMap;
