<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="英雄管理" :cat="id ? '编辑英雄' : '添加英雄'" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-form label-width="100px">
        <el-tabs type="border-card">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息">
            <!-- 英雄名称 -->
            <el-form-item label="英雄名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <!-- 英雄称号 -->
            <el-form-item label="英雄称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
            <!-- 英雄类型 -->
            <el-form-item label="英雄定位" v-if="heroCateList">
              <el-select
                v-model="model.categories"
                placeholder="请选择英雄分类"
                multiple
              >
                <el-option
                  v-for="item in heroCateList"
                  :label="item.name"
                  :key="item._id"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 难度 -->
            <el-form-item label="难度">
              <el-rate
                show-score
                :max="10"
                v-model="model.scores.difficult"
              ></el-rate>
            </el-form-item>
            <!-- 技能 -->
            <el-form-item label="技能">
              <el-rate
                show-score
                :max="10"
                v-model="model.scores.skill"
              ></el-rate>
            </el-form-item>
            <!-- 攻击 -->
            <el-form-item label="攻击">
              <el-rate
                show-score
                :max="10"
                v-model="model.scores.attack"
              ></el-rate>
            </el-form-item>
            <!-- 生存 -->
            <el-form-item label="生存">
              <el-rate
                show-score
                :max="10"
                v-model="model.scores.survive"
              ></el-rate>
            </el-form-item>
            <!-- 英雄头像 -->
            <el-form-item label="英雄头像">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(model, 'avatar', res.url)"
              >
                <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 背景图片 -->
            <el-form-item label="背景图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(model, 'banner', res.url)"
              >
                <img v-if="model.banner" :src="model.banner" class="banner" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <!-- 技能管理 -->
          <el-tab-pane label="技能管理">
            <el-button type="primary" size="small" @click="addSkills"
              >+ 添加技能</el-button
            >

            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col v-for="(item, i) in model.skills" :key="i" :span="12">
                <el-card>
                  <el-tag>技能{{ i + 1 }}</el-tag>
                  <el-form-item label="技能名称" label-width="80px">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="技能图标" label-width="80px">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res => $set(item, 'icon', res.url)"
                    >
                      <img v-if="item.icon" :src="item.icon" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="冷却值" label-width="80px">
                    <el-input type="text" v-model="item.delay"></el-input>
                  </el-form-item>
                  <el-form-item label="消耗" label-width="80px">
                    <el-input type="text" v-model="item.cost"></el-input>
                  </el-form-item>
                  <el-form-item label="技能描述" label-width="80px">
                    <el-input type="textarea" v-model="item.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="小提示" label-width="80px">
                    <el-input type="textarea" v-model="item.tips"></el-input>
                  </el-form-item>
                  <el-button type="danger" @click="deleteSkill(i)"
                    >删除技能</el-button
                  >
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 介绍视频 -->
          <el-tab-pane label="介绍视频">
            <el-form-item label="标题">
              <el-input v-model="model.video.title" clearable></el-input>
            </el-form-item>
            <el-form-item label="视频">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(model.video, 'video', res.url)"
              >
                <video
                  class="banner"
                  controls
                  v-if="model.video.video"
                  :src="model.video.video"
                />
                <i v-else class="el-icon-upload avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="投稿">
              <el-input v-model="model.video.submit" clearable></el-input>
            </el-form-item>
            <el-form-item label="粉丝">
              <el-input v-model="model.video.fan" clearable></el-input>
            </el-form-item>
            <el-form-item label="观看次数">
              <el-input v-model="model.video.view" clearable></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 英雄皮肤 -->
          <el-tab-pane label="英雄皮肤">
            <el-button type="primary" size="small" @click="addSkins"
              >+ 添加皮肤</el-button
            >
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col v-for="(item, i) in model.skins" :key="i" :span="12">
                <el-card>
                  <el-tag>皮肤{{ i + 1 }}</el-tag>
                  <el-form-item label="皮肤名称" label-width="80px">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="皮肤图片" label-width="80px">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res => $set(item, 'image', res.url)"
                    >
                      <img v-if="item.image" :src="item.image" class="banner" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-button type="danger" @click="deleteSkin(i)"
                    >删除皮肤</el-button
                  >
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 出装推荐 -->
          <el-tab-pane label="出装推荐">
            <!-- 顺风出装 -->
            <el-form-item label="顺风出装">
              <el-select
                filterable
                v-model="model.downWind.equipment"
                placeholder="请选择顺风出装"
                multiple
              >
                <el-option
                  v-for="item in itemList"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="顺风技巧">
              <el-input
                v-model="model.downWind.tips"
                type="textarea"
              ></el-input>
            </el-form-item>
            <!-- 逆风出装 -->
            <el-form-item label="逆风出装">
              <el-select
                filterable
                v-model="model.upWind.equipment"
                placeholder="请选择逆风出装"
                multiple
              >
                <el-option
                  v-for="item in itemList"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风技巧">
              <el-input v-model="model.upWind.tips" type="textarea"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 使用技巧 -->
          <el-tab-pane label="使用技巧">
            <!-- 使用技巧 -->
            <el-form-item label="使用技巧">
              <el-input v-model="model.usageTips" type="textarea"></el-input>
            </el-form-item>
            <!-- 对抗技巧 -->
            <el-form-item label="对抗技巧">
              <el-input v-model="model.battleTips" type="textarea"></el-input>
            </el-form-item>
            <!-- 团战思路 -->
            <el-form-item label="团战思路">
              <el-input v-model="model.teamTips" type="textarea"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 英雄关系 -->
          <el-tab-pane label="英雄关系">
            <el-tabs value="basic">
              <el-tab-pane label="最佳搭档" name="basic">
                <el-button
                  type="primary"
                  size="small"
                  @click="model.partners.push({})"
                  >+ 添加英雄</el-button
                >
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col
                    v-for="(item, i) in model.partners"
                    :key="i"
                    :span="12"
                  >
                    <el-card>
                      <el-tag>英雄{{ i + 1 }}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select
                          v-model="item.hero"
                          filterable
                          placeholder="请选择英雄"
                        >
                          <el-option
                            v-for="item in heroList"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input
                          type="textarea"
                          v-model="item.desc"
                        ></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delPartner(i)"
                        >删除</el-button
                      >
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="被谁克制">
                <el-button
                  type="primary"
                  size="small"
                  @click="model.restrained.push({})"
                  >+ 添加英雄</el-button
                >
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col
                    v-for="(item, i) in model.restrained"
                    :key="i"
                    :span="12"
                  >
                    <el-card>
                      <el-tag>英雄{{ i + 1 }}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select
                          v-model="item.hero"
                          filterable
                          placeholder="请选择英雄"
                        >
                          <el-option
                            v-for="item in heroList"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input
                          type="textarea"
                          v-model="item.desc"
                        ></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delRestrained(i)"
                        >删除</el-button
                      >
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="克制谁">
                <el-button
                  type="primary"
                  size="small"
                  @click="model.restraint.push({})"
                  >+ 添加英雄</el-button
                >
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col
                    v-for="(item, i) in model.restraint"
                    :key="i"
                    :span="12"
                  >
                    <el-card>
                      <el-tag>英雄{{ i + 1 }}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select
                          v-model="item.hero"
                          filterable
                          placeholder="请选择英雄"
                        >
                          <el-option
                            v-for="item in heroList"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input
                          type="textarea"
                          v-model="item.desc"
                        ></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delRestraint(i)"
                        >删除</el-button
                      >
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button
        style="margin-top:15px;margin-left:7%"
        type="primary"
        @click="save"
        >保存</el-button
      >
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'HeroEdit',
  components: { Breadcrumb },
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: '',
        avatar: '',
        scores: {
          difficult: 0
        },
        video: {},
        downWind: {},
        upWind: {},
        skins: [],
        skills: [],
        partners: [],
        restrained: [],
        restraint: []
      },
      heroCateList: null,
      itemList: [],
      heroList: []
    }
  },
  created() {
    this.getItemList()
    this.getCateList()
    this.getHeroList()
    this.id && this.fetch()
  },
  methods: {
    // 保存
    async save() {
      if (this.id) {
        await this.axios.put(`rest/heroes/${this.id}`, this.model)
        this.$message.success('保存成功!')
      } else {
        await this.axios.post('rest/heroes', this.model)
        this.$message.success('添加成功!')
      }
      this.$router.push('/heroes/list')
    },
    // 获取英雄详情信息
    async fetch() {
      const res = await this.axios.get(`rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取分类数据
    async getCateList() {
      const res = await this.axios.get(`rest/categories`)
      this.cateList = res.data
    },
    // 获取物品数据
    async getItemList() {
      const res = await this.axios.get(`rest/items`)
      this.itemList = res.data
    },
    // 获取英雄数据
    async getHeroList() {
      const res = await this.axios.get(`rest/heroes`)
      this.heroList = res.data
    },
    //监听添加技能按钮
    addSkills() {
      this.model.skills.push({})
    },
    deleteSkill(i) {
      this.model.skills.splice(i, 1)
    },
    //监听添加皮肤按钮
    addSkins() {
      this.model.skins.push({})
    },
    deleteSkin(i) {
      this.model.skins.splice(i, 1)
    },
    //监听添加视频按钮
    addVideos() {
      this.model.skins.push({})
    },
    deleteVideo(i) {
      this.model.skins.splice(i, 1)
    },
    delPartner(i) {
      this.model.partners.splice(i, 1)
    },
    delRestrained(i) {
      this.model.restrained.splice(i, 1)
    },
    delRestraint(i) {
      this.model.restraint.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.save-btn {
  position: absolute;
  top: 15px;
  right: 35px;
}

.el-tag {
  margin: 10px;
}

.skill-card {
  max-width: 40%;
}

.banner {
  width: 300px;
  vertical-align: middle;
}
// upload
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>
