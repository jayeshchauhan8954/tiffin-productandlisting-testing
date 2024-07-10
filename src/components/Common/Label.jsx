import PropTypes from "prop-types";

// material
import { alpha, styled } from "@mui/material";
import { _orderDeliveryStatus, _orderDetailStatus, _productStatus, _profileStatus, _status } from "@/utils/constants/constants";

const RootStyle = styled("span")(({ theme, styleProps }) => {
    const isLight = theme.palette.mode === "light";
    const { color, variant } = styleProps;

    const styleFilled = (color) => ({
        color: theme.palette[color[0]].contrastText,
        backgroundColor:
            theme.palette[color[0]][
            color[1]
            ] /* Ex : will work like theme.palatte.success.main */,
    });

    const styleOutlined = (color) => ({
        color: theme.palette[color[0]][color[1]],
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette[color[0]][color[1]]}`,
    });

    const styleGhost = (color) => ({
        color: theme.palette[color[0]][isLight ? "dark" : "light"],
        backgroundColor: alpha(theme.palette[color[0]][color[1]], 0.16),
    });

    return {
        height: 22,
        minWidth: 22,
        lineHeight: 0,
        borderRadius: 8,
        cursor: "default",
        alignItems: "center",
        whiteSpace: "nowrap",
        display: "inline-flex",
        justifyContent: "center",
        padding: theme.spacing(0, 1),
        color: theme.palette.grey[800],
        fontSize: theme.typography.pxToRem(12),
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.grey[300],
        fontWeight: theme.typography.fontWeightBold,

        ...(color !== "default"
            ? {
                ...(variant === "filled" && { ...styleFilled(color) }),
                ...(variant === "outlined" && { ...styleOutlined(color) }),
                ...(variant === "ghost" && { ...styleGhost(color) }),
            }
            : {
                ...(variant === "outlined" && {
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.grey[500_32]}`,
                }),
                ...(variant === "ghost" && {
                    color: isLight
                        ? theme.palette.text.secondary
                        : theme.palette.common.white,
                    backgroundColor: theme.palette.grey[500_16],
                }),
            }),
    };
});

// ----------------------------------------------------------------------

export default function Label({
    color,
    variant = "ghost",
    children,
    type = "status",
    value = "",
    others
}) {

    const _statusMap = {
        [_status.inactive]: ["error", "main"],
        [_status.active]: ["success", "main"],
    };

    const _profileStatusMap = {
        [_profileStatus[0]]: ["error", "main"],
        [_profileStatus[1]]: ["success", "main"],
        [_profileStatus[2]]: ["warning", "main"],
        [_profileStatus[3]]: ["info", "main"],
        [_profileStatus[4]]: ["primary", "main"],
    };

    const _productStatusMap = {
        [_productStatus.Active]: ["success", "main"],
        [_productStatus.Inactive]: ["warning", "main"],
        [_productStatus.Rejected]: ["error", "main"],
    };
    const _orderStatusMap = {
        [_orderDetailStatus[0]]: ["warning", "main"],
        [_orderDetailStatus[1]]: ["info", "main"],
        [_orderDetailStatus[2]]: ["error", "main"],
        [_orderDetailStatus[3]]: ["success", "main"],
        [_orderDetailStatus[4]]: ["secondary", "main"],
    };

    switch (type) {
        case "status":
            color = _statusMap[value];
            break;
        case "profileStatus":
            color = _profileStatusMap[value];
            break;
        case "productStatus":
            color = _productStatusMap[value];
            break;
        case "orderStatus":
            color = _orderStatusMap[value];
            break;
        default:
            color = [color || "primary", "main"];
            break;
    }
    if (!color) return <></>;
    return (
        <RootStyle styleProps={{ color, variant }} {...others}>
            {children}
        </RootStyle>
    );
}

Label.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf([
        "default",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
    ]),
    variant: PropTypes.oneOf(["filled", "outlined", "ghost"]),
    status: PropTypes.oneOf(["status"]),
    value: PropTypes.string | PropTypes.number
};
