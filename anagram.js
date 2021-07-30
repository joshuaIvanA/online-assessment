const sort = (arr, l, r) => {
	if((r-l)==0){
		return [arr[l]]
	}
	if((r-l)==1){
		if(arr[l]<arr[r])
			return [arr[l], arr[r]]
		return [arr[r], arr[l]]
	}
	const mid=Math.floor((l+r)/2)
	const left= sort(arr, l, mid)
	const right= sort(arr, mid+1, r)
	const res=[]
	while(left.length>0 || right.length>0){
		if(left.length>0 && right.length>0){
			if(left[0]<right[0]){
			res.push(left.shift())
			}else{
			res.push(right.shift())
			}
		}else if (left.length>0){
			res.push(left.shift())
		}else{
			res.push(right.shift())
		}
	}
	return res
}

const groupAnagram = (arr) => {
	const groups = {}
	arr.forEach((str) => {
		const key = (sort([...str], 0, str.length-1)).join('')
		if(groups[key]){
			groups[key].push(str)
		}else{
			groups[key]=[str]
		}
	})
	return Object.values(groups)
}
try{
	console.log(groupAnagram(JSON.parse(process.argv.slice(2)[0].replace(/\'/g, '\"'))))
}catch(e){
	console.log(e)
}