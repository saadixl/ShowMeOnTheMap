import { feature } from 'topojson-client'
import countriesTopo from 'world-atlas/countries-110m.json'
import smallCountriesPatch from './smallCountriesPatch.json'

const base = feature(countriesTopo, countriesTopo.objects.countries)

/** ISO 3166-1 numeric ids present in smallCountriesPatch (110m drops tiny states). */
const patchIds = new Set(
  smallCountriesPatch.features.map((f) => String(f.id)),
)

/** Natural Earth 110m plus small countries omitted at that resolution. */
export const countriesGeo = {
  type: 'FeatureCollection',
  features: [
    ...base.features.filter((f) => !patchIds.has(String(f.id))),
    ...smallCountriesPatch.features,
  ],
}
