import React, { useContext } from "react";
import {Container, Divider, Grid, Link, List, ListItem, Typography} from "@mui/material";
import {GetLocaleData, IsRtl, MediaQueryCheck} from "../customHook/useGlobal"
import duTheme from "../assets/theme";

export default function TheFooter(props) {

    const staticData = {
        copyrights: {
            en: "Copyright EITC, All rights reserved.",
            ar: "جميع الحقوق محفوظة لشركة الإمارات للاتصالات المتكاملة"
        },
        links: [
            {
                lbl: {
                    en: "Site map",
                    ar: "خريطة الموقع",
                },
                link: {
                    en: "https://www.du.ae/sitemap",
                    ar: "https://www.du.ae/ar/sitemap"
                }
            },
            {
                lbl: {
                    en: "Terms & conditions",
                    ar: "الشروط والاحكام",
                },
                link: {
                    en: "https://www.du.ae/terms-and-conditions",
                    ar: "https://www.du.ae/ar/terms-and-conditions"
                }
            },
            {
                lbl: {
                    en: "Legal",
                    ar: "سياسة الخصوصية"
                },
                link: {
                    en: "https://www.du.ae/legal",
                    ar: "https://www.du.ae/ar/legal"
                }
            }
        ]
    }

    const isRtl = IsRtl()
    const isScreenExtraSmall = MediaQueryCheck("xs")

    function getCopyrightYear() {
        const d = new Date()
        return d.getFullYear()
    }


    return (
        <React.Fragment>
            <Container disableGutters maxWidth={false}>
                <Container disableGutters sx={{my: 10}}>
                    <Grid container sx={{ pt: 2, pb: 2, px: {xs: duTheme.spacing(4)} }} alignItems="center" justifyContent={isScreenExtraSmall ? "center": undefined}>
                        <Grid item sm={12}  md={6}>
                          <Typography variant={isScreenExtraSmall ? "body3" : "body2"} component="div">  © {getCopyrightYear()} { GetLocaleData(staticData.copyrights) } </Typography>
                        </Grid>
                        <Grid item sm={12}  md={6} align={isRtl ? "left" : "right"}>
                            <List sx={{display: "flex",justifyContent: "flex-end"}}>
                                { staticData.links.map((link, i) =>
                                    <ListItem key={i} sx={{py: 0, width: "auto"}}>
                                        <Link href={GetLocaleData(link.link)} color="text.primary" underline="none" sx={{py: 0, pr: 0, fontSize: duTheme.typography.body2.fontSize}}>{GetLocaleData(link.lbl)}</Link>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                    </Grid>
                </Container>

            </Container>
        </React.Fragment>
    );
}