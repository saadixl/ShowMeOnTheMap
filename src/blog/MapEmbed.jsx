/**
 * Embeds the live ShowMeOnTheMap map in an iframe with overlays pre-selected.
 * @param {{ params: string, title?: string }} props
 *   params - query string without leading `?`, e.g. "e=Ro" or "l=En&r=Mu"
 */
export function MapEmbed({ params, title }) {
  const iframeSrc = `/?${params}&embed=1`
  const fullSrc = `/?${params}`
  const label = title || 'Embedded interactive map'
  return (
    <figure className="map-embed">
      <iframe
        className="map-embed__frame"
        src={iframeSrc}
        title={label}
        loading="lazy"
        allow="geolocation"
      />
      <figcaption className="map-embed__caption">
        <a href={fullSrc} target="_blank" rel="noopener noreferrer">
          Open this view in a new tab ↗
        </a>
      </figcaption>
    </figure>
  )
}
