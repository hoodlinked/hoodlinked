import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'
import { Link } from "@reach/router"

export default function Nav() {
    return (

        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='#'>
                    Home
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='#'>
                    About
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Contact</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}
