import InfraDB from "../../../../infrastructure/database"

export async function UserController() {
    return "Hello World"
}


export async function GetDataSourcesHandler() {
    const datasources = []

    for (const data in InfraDB.getDataSources()) {
        const datasource = InfraDB.getDataSource(data)
        datasources.push({ name: data, status: datasource.isInitialized })
    }

    return datasources
}