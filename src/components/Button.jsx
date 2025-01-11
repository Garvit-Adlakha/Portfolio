import PropTypes from "prop-types"
import { label } from "three/tsl"

const ButtonPrimary = ({
    href,
    target='_self',
    labe,
    icon,
    classes
}) => {
  return (
    <div>Button</div>
  )
}
ButtonPrimary.PropTypes={
    label:PropTypes.string.isRequired,
    href:PropTypes.string,
    target:PropTypes.string,
    icon:PropTypes.string.isRequired,
    classes:PropTypes.string
}

export default Button