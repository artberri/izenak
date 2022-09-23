import { Route } from "../../providers/NavigationProvider"
import { InfoIcon } from "../InfoIcon/InfoIcon"
import { Link } from "../Link/Link"
import "./Footer.css"

export function Footer() {
	return (
		<footer role="contentinfo" class="footer">
			<div class="footer__dev">
				<a
					class="footer__link"
					href="https://www.albertovarela.net"
					title="Aplikazio honen egilearen webgunea"
					target="_blank"
					rel="noreferrer noopener"
				>
					Alberto Varelak
				</a>
				&nbsp;
				<span>garatua</span>
			</div>
			<div>
				<Link route={Route.About}>
					<InfoIcon title="Honi buruz" />
				</Link>
			</div>
		</footer>
	)
}
