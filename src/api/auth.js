import request from '@/utils/request'

// 退回
export function goback (data) {
	return request({
		url: '/bpm/back',
		method: 'post',
		data
	})
}
// 召回
export function revoke (data) {
	return request({
		url: '/bpm/revoke',
		method: 'post',
		data
	})
}
// 不同意
export function disagree (data) {
	return request({
		url: '/bpm/terminate',
		method: 'post',
		data
	})
}
// 交办
export function auth (data) {
	return request({
		url: '/bpm/transfer',
		method: 'post',
		data
	})
}
// 督办
export function press (data) {
	return request({
		url: '/invest/press',
		method: 'post',
		data
	})
}
