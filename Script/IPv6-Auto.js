!(async () => {
  let IPv6 = !!$network?.v6?.primaryAddress
  let modules = await httpAPI('/v1/modules', 'GET')
  let previousIPv6 = modules.enabled.includes('IPv6 开启')
  if (previousIPv6 !== IPv6) {
    console.log(`IPv6: ${previousIPv6} -> ${IPv6}`)
    modules = await httpAPI('/v1/modules', 'POST', {
      'IPv6 开启': IPv6,
      'IPv6 关闭': !IPv6,
    })
    // console.log(JSON.stringify(modules, null, 2))
    const dns = await httpAPI('/v1/dns/flush', 'POST')
    console.log(JSON.stringify(dns, null, 2))
  } else {
    console.log(`IPv6: ${IPv6}`)
  }
  $done({ IPv6 })
})()

function httpAPI(path = '', method = 'POST', body = null) {
  return new Promise(resolve => {
    $httpAPI(method, path, body, result => {
      resolve(result)
    })
  })
}
