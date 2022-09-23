import { InfoIcon } from "../InfoIcon/InfoIcon"
import "./Footer.css"

export function Footer() {
	return (
		<footer role="contentinfo" class="footer">
			<div class="footer__dev">
				<a
					class="footer__link"
					href="https://www.albertovarela.net"
					title="Aplikazio honen egilearen webgunea"
				>
					Alberto Varelak
				</a>
				&nbsp;
				<span>garatua</span>
			</div>
			<div>
				<a href="/honiburuz">
					<InfoIcon title="Honi buruz" />
				</a>
			</div>
		</footer>
	)
}
