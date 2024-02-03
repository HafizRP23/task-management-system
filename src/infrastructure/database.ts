import { DataSource } from "typeorm";
import { AddDataSourceParams } from "../domain/models/App";

class DatabaseInfrastructure {
    private dataSources: Record<string, DataSource> = {}

    addDataSource({ name, config }: AddDataSourceParams) {
        if(this.dataSources[name] !== undefined) {
            throw new Error("NAME_ALREADY_USED")
        }

        this.dataSources[name] = new DataSource(config)

        return this.dataSources[name]
    }

    getDataSource(name?: string) {
        if(name === undefined) {
            return this.dataSources["main"]
        }

        if(this.dataSources[name] == undefined) {
            throw new Error("DATASOURCE_NOT_FOUND")
        }

        return this.dataSources[name]
    }

    getDataSources() {
        return this.dataSources
    }
}

export default new DatabaseInfrastructure()