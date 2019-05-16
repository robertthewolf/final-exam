import React from 'react'
import PropTypes from 'prop-types'

import Text from './Text'
import Features from './Features'
import CallToAction from './CallToAction'
import Gallery from './Gallery'
import Banner from './Banner'
import RoomList from './RoomList'
import Map from './Map'
import Review from './Review'
import Social from './Social'

const Slices = ({ allSlices }) => allSlices.map(s => {

    switch (s.slice_type) {

        case 'image_gallery':
            return <Gallery key={s.id} data={s} />

        case 'text':
            return <Text key={s.id} data={s} />

        case 'features':
            return <Features key={s.id} data={s} />

        case 'banner':
            return <Banner key={s.id} data={s} />

        case 'list_of_articles':
            return <RoomList key={s.id} data={s} />

        case 'call_to_action':
            return <CallToAction key={s.id} data={s} />

        case 'map':
            return <Map key={s.id} data={s} />
            
        case 'review':
            return <Review key={s.id} data={s} />
        
        case 'social':
            return <Social key={s.id} data={s} />

        default:
            return null
    }
})

export default Slices

Slices.propTypes = {
    allSlices: PropTypes.array.isRequired,
}
