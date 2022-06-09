import { useMemo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api'
import dataPoints from '../public/dataPoints.json'

const aqiToColor = (aqi) => {
  if (aqi <= 50) {
    return '#00e400'
  } else if (aqi <= 100) {
    return '#ffff00'
  } else if (aqi <= 150) {
    return '#ff7e00'
  } else if (aqi <= 200) {
    return '#ff0000'
  } else if (aqi <= 300) {
    return '#99004c'
  } else {
    return '#7e0023'
  }
}

const Map = () => {
  const containerStyle = useMemo(() => ({
    width: '100vw',
    height: '100vh'
  }))
  const hanoi = useMemo(() => ({
    lat: 21.028511,
    lng: 105.804817
  }))
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })
  const [map, setMap] = useState(null)
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(hanoi)
    map.fitBounds(bounds)
    setMap(map)
  }, [])
  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])
  return isLoaded ?
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={hanoi}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        minZoom: 3,
        maxZoom: 20,
      }}
    >
      {
        dataPoints.map(({ position, aqi }, index) =>
          <OverlayView key={index} position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className='relative'>
              <div className='absolute w-full h-full flex items-center justify-center text-white pb-1'>{aqi}</div>
              <i className='fas fa-message-middle text-2xl' style={{ color: aqiToColor(aqi) }} />
            </div>
          </OverlayView>
        )
      }
    </GoogleMap>
    :
    <></>
}

export default Map