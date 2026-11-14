function decode(parts) {
  return parts.map((p) => String.fromCharCode(...p)).join('')
}

export function EmailLink({ className }) {
  // Basic obfuscation to reduce email scraping from source/HTML.
  const local = decode([[97, 109, 109, 97, 115, 117, 100, 117, 108, 104, 97, 113, 117, 101]])
  const domain = decode([[103, 109, 97, 105, 108], [46], [99, 111, 109]])
  const email = `${local}@${domain}`

  return (
    <a className={className} href={`mailto:${email}`}>
      {email}
    </a>
  )
}

