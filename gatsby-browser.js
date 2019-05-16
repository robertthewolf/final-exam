exports.shouldUpdateScroll = props => {
    const currentPosition = props.getSavedScrollPosition(props.prevRouterProps.location)
    // const currentPosition = getSavedScrollPosition(props.routerProps.location)

    console.log(currentPosition)
  
    if (currentPosition !== null) window.scrollTo(...(currentPosition))
  
    return false
  }